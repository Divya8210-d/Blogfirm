import express from 'express';
import {
  autosaveblog,
  createblog,
  deleteautodraft,
  deletedraft,
  deletepost,
  getallblogs,
  getblogbytitle,
  redraft,
  republish,
  saveblog,
  userdraftedblog,
  userpublishedblog
} from '../controller/blog.controller.js';

import verify from '../middlewares/auth.midleware.js';

const router = express.Router();

router.post("/create", verify, createblog);
router.post("/save", verify, saveblog);
router.post("/autosave", verify, autosaveblog);
router.post("/republish", verify, republish);
router.post("/redraft", verify, redraft);

router.get("/", verify, getallblogs);
router.get("/userpublish", verify, userpublishedblog);
router.get("/userdraft", verify, userdraftedblog);
router.get("/title", verify, getblogbytitle);

router.post("/autodraftdelete", verify, deleteautodraft);
router.post("/deletedraft", verify, deletedraft);
router.post("/deletepost", verify, deletepost);

export default router;
