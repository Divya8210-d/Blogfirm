import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const blogschema = new Schema({
      user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
      
  tags: {
    type: [String],
  },
}, {
  timestamps: true 
});

//coveting title into slug






export const Blog = mongoose.model("Blog", blogschema);
