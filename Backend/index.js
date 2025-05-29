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

