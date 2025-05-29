import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import cookieParser from "cookie-parser";
import connectDB from './db/connect.js';
import verify from './middlewares/auth.midleware.js';
import { getuser, login, logout, register } from './controller/user.controller.js';
import { autosaveblog, createblog, deleteautodraft, deletedraft, deletepost, getallblogs,  getblogbytitle,  redraft, republish, saveblog, userdraftedblog, userpublishedblog } from './controller/blog.controller.js';


connectDB()
.then(() => {
    app.listen(4000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


//authendpoints 
app.post("/api/v1/users/register",register)
app.post("/api/v1/users/login",login
)
app.post("/api/v1/users/logout",verify,logout
)


//blogsendpoints

app.post("/api/v1/blog/publish",verify,createblog)
app.post("/api/v1/blog/save",verify,saveblog
)
app.post("/api/v1/blog/autosave",verify,autosaveblog
)
app.post("/api/v1/blog/republish",verify,republish)
app.post("/api/v1/blog/redraft",verify,redraft)

app.get("/api/v1/blog/",verify,getallblogs
)
app.get("/api/v1/user",verify,getuser
)


app.get("/api/v1/blog/userpublish",verify,userpublishedblog
)
app.get("/api/v1/blog/userdraft",verify,userdraftedblog
)
app.get("/api/v1/blog/title",verify,getblogbytitle
)


app.post("/api/v1/blog/autodraftdelete",verify,deleteautodraft)
app.post("/api/v1/blog/deletedraft",verify,deletedraft)
app.post("/api/v1/blog/deletepost",verify,deletepost)