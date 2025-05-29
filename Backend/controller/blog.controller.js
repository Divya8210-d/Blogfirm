import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";


//publishing blog
const createblog = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title?.trim() || !content?.trim()) {
    throw new ApiError(400, "Fields are required");
  }

  let blog = await Blog.findOne({ user: req.user.email, title:{ $regex: title, $options: 'i' },status: { $in: ["autodraft", "draft"] } });

  if (blog) {
    blog.status = "published";
    blog.content = content;
    blog.tags = tags;
    await blog.save();
  } else {
    blog = await Blog.create({
      user: req.user.email,
      title,
      content,
      status: "published",
      tags
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { blog }, "Blog published successfully"));
});

//autosave and save and edit draft

const saveblog = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title?.trim() ) {
    throw new ApiError(400, "Title are required");
  }

  let blog = await Blog.findOne({ user: req.user.email, title:{ $regex: title, $options: 'i' }, status: "autodraft" });

  if (blog) {
    blog.status = "draft";
    blog.content = content;
    blog.tags = tags;
    await blog.save();
  } else {
    blog = await Blog.create({
      user: req.user.email,
      title,
      content,
      status: "draft",
      tags
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { blog }, "Blog saved as draft"));
});


const autosaveblog = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title?.trim() || !content?.trim()) {
    throw new ApiError(400, "Fields are required");
  }

  const existing = await Blog.findOne({
    user: req.user.email,
    title:{ $regex: title, $options: 'i' },
    status: "autodraft"
  });

  let blog;
  if (existing) {
    blog = await Blog.findOneAndUpdate(
      { _id: existing._id },
      { content, tags },
      { new: true }
    );
  } else {
    blog = await Blog.create({
      user: req.user.email,
      title,
      content,
      status: "autodraft",
      tags
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { blog }, "Autosave successful"));
});

const redraft = asyncHandler(async (req,res) => {
    
const {title,content,tags,id} =req.body


if(!title?.trim() || !content?.trim()){
     throw new ApiError(400,"Fields are required");     
}

 let blog = await Blog.findOne({ _id:id,user: req.user.email, title:{ $regex: title, $options: 'i' }, status: "draft" });
if(blog){

const updatedBlog = await Blog.findOneAndUpdate(
  { _id:id,user: req.user.email,  status: "draft" },
  {  content, tags },
  { new: true }
);

if (!updatedBlog) {
  throw new ApiError(404, "Drafted blog not found");
}


return res.status(200).json( new ApiResponse(200,"Blog re-drafted"))

   
}

else{ return res.status(400).json( new ApiError(400,"No existing draft available"))}




})















//editing post
const republish = asyncHandler(async (req,res) => {
    
const {title,content,tags,id} =req.body


if(!title?.trim() || !content?.trim()){
     throw new ApiError(400,"Fields are required");     
}

 let blog = await Blog.findOne({_id:id, user: req.user.email, title:{ $regex: title, $options: 'i' }, status: "published" });
if(blog){

const updatedBlog = await Blog.findOneAndUpdate(
  {_id:id, user: req.user.email,  status: "published" },
  {  content, tags },
  { new: true }
);

if (!updatedBlog) {
  throw new ApiError(404, "Published blog not found");
}


return res.status(200).json( new ApiResponse(200,"Blog re-published"))

   
}

else{ return res.status(400).json( new ApiError(400,"No existing post available"))}




})









//fetching all blogs
const getallblogs = asyncHandler(async (req,res) => {
    
const blogs = await Blog.find({status:"published"})

if(blogs.length === 0){
    throw new ApiError(500,"Something went wrong while fetching blogs")
}


return res.status(200).json(new ApiResponse(200,blogs,"Blogs Fetched"))

})


//geting user published blogs
const userpublishedblog = asyncHandler(async (req,res) => {
    const blogs = await Blog.find({user:req.user.email,status:"published"})

if(blogs.length === 0){
    throw new ApiError(500,"Looks like No published blogs of yours is present") 
}


return res.status(200).json(new ApiResponse(200,blogs,"Blogs Fetched"))

})


//getting user drafted blogs
const userdraftedblog = asyncHandler(async (req,res) => {
    const blogs = await Blog.find({user:req.user.email,status:"draft"})

if(blogs.length === 0){
    throw new ApiError(500,"Lokks like No drafted blogs of yours is present")
}




return res.status(200).json(new ApiResponse(200,blogs,"Blogs Fetched"))


})


//getting specific blog by slug

const deleteautodraft = asyncHandler(async (req, res) => {
  // Calculate time 10 minutes ago
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  
  await Blog.deleteMany({
    user: req.user.email,
    status: "autodraft",
    createdAt: { $lt: tenMinutesAgo }
  });

  return res.status(200).json(new ApiResponse(200, "Old autodrafts deleted successfully"));
});










const deletedraft = asyncHandler(async (req,res) => {
  const {id} = req.body;

  if(!id){
    throw new ApiError(400,"Title is required")
  }

const blog = await Blog.findOneAndDelete({user:req.user.email,_id:id,status:"draft"})



return res.status(200).json( new ApiResponse(200,"Draft deleted"))

})




const deletepost = asyncHandler(async (req,res) => {
  const {id} = req.body;

  if(!id){
    throw new ApiError(400,"Id is required")
  }

const blog = await Blog.findOneAndDelete({user:req.user.email,_id:id,status:"published"})



return res.status(200).json( new ApiResponse(200,"Post deleted"))

})




const getblogbytitle = asyncHandler(async (req,res) => {
  
const {title} = req.query;


  if (!title?.trim()) {
    throw new ApiError(400, "Title is required");
  }

const blogs =await  Blog.find({title:{ $regex: title, $options: 'i' } ,status:"published"})


if(blogs.length==0){
  throw new ApiError(500,"No blogs founds")
}
return res.status(200).json( new ApiResponse(200,blogs,"Blogs Fetched"))

})






export {getblogbytitle,createblog,saveblog,republish,getallblogs,userdraftedblog,userpublishedblog,autosaveblog,redraft,deleteautodraft,deletedraft,deletepost}