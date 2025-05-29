import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asynchandler.js"


//register user controller
const register = asyncHandler(async (req, res) => {

     const { username, email, password } = req.body


    if (username == "") {
        throw new ApiError(400, "Your name is required")
    }
    if (email == "") {
        throw new ApiError(400, "Your email is required")
    }
    if (password == "") {
        throw new ApiError(400, "Your password is required")
    }


    const alreadyuser = await User.findOne({ email: email })


    if (alreadyuser) {
        return res.status(400).json({message:"USER alreADY exists"})
    }

  const userDetail = await User.create({
        username,
        email,
        password,
        
    })


    const createdUser = await User.findById(userDetail._id).select(
        "-password"
    )


    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }



    return res.status(200).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")

    )



})


//function for generating accessand refresh token 


const generateAccessAndRefereshTokens = async (user_id) => {
    
const user = await User.findById(user_id)
if(!user){
    throw new ApiError(400,"Invalid User")
}

const accessToken= await user.generateAccessToken()
const refreshToken = await user.generateRefreshToken()


return {accessToken,refreshToken}



}



//controller for logging in the user
const login = asyncHandler(async (req, res) => {


   const {email,  password} = req.body
   console.log(email)

    if (email == "") {
        throw new ApiError(400, "Your email is required")
    }
    if (password == "") {
        throw new ApiError(400, "Your password is required")
    }

    const user = await User.findOne({ email: email })


    if (!user) {
        throw new ApiError(400, "No User Found")
    }

    const checkpassword = user.isPasswordCorrect(password)


    if (!checkpassword) {
        throw new ApiError(400, "Invalid Password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id) 

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {     
        httpOnly: true,
        secure: false
    }

 return res.status(200)
 .cookie("accessToken", accessToken, options)
 .cookie("refreshToken", refreshToken, options)
 .json( new ApiResponse(200,{

      user: loggedUser, accessToken, refreshToken
 },"User logged in successfully"))


}
)



//controller for logging out the user
const logout = asyncHandler(async (req,res) => {
    
      await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))


})




//getting the username of user
const getuser = asyncHandler(async (req,res) => {
    

const user = await User.findOne({email:req.user.email})

if(!user){
    throw new ApiError(500,"No User found")
}

const username = user.username;

return res.status(200).json( new ApiResponse(200,{username},"User Fetched"))

})



export {register,login,logout,getuser}