import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

import rightpersonimg from "./rightpersonimg.png";

function Mainblog() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');


  //geting the all blogs
  const getPublish = async () => {
    try {
      const res = await axios.get("https://blogfirm.onrender.com/api/v1/blog/", { withCredentials: true });
      setBlogs(res.data.data.slice(0, 10));
    } catch (err) {
      toast.error(err.response?.data?.message||"Something went wrong while fetching  posts");
    }
  };



  useEffect(() => {
    getPublish();
  }, [search]);



//handler for searching a blog using title
const getbytitle = async () => {
  try {
    const res = await axios.get(
      "https://blogfirm.onrender.com/api/v1/blog/title",
      {
        params: { title: search }, 
        withCredentials: true,     
      }
    );
    setBlogs(res.data.data);
  } catch (err) {
    toast.error(err.response?.data?.message||"Something went wrong")
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white pb-12">
      <ToastContainer position='top-center' />

      {/* Intro section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full bg-[#dab74e] mb-8 shadow-lg px-4 py-10"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-brown-900 text-4xl font-semibold leading-relaxed sm:w-1/2 text-center sm:text-left"
          >
            Welcome to the Blog Arena!
            <br />
            Search and explore amazing posts.
          </motion.div>

        
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="sm:w-1/3 flex justify-center sm:justify-end"
          >
            <img
              src={rightpersonimg}
              alt="Right Person"
              className="h-40 sm:h-52 drop-shadow-md object-contain"
            />
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 flex justify-center"
        >
          <input
            type="text"
            placeholder="Enter blog topics to explores"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-4/5 max-w-sm rounded-md border border-gray-300 text-base focus:outline-none backdrop-blur-sm bg-white/80 mr-2"
          />
          <button
            onClick={getbytitle}
            className="px-4 py-2 text-white text-base rounded-md bg-orange-500 shadow-md hover:bg-orange-600 transition"
          >
            Search
          </button>
        </motion.div>
      </motion.div>

  
      <h2 className="text-center text-2xl font-semibold text-orange-600 mb-6 drop-shadow-sm">
        Blogs to Read
      </h2>

      {/* Blog Cards */}
      <div className="flex flex-col gap-6 px-4 max-w-6xl mx-auto">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full border-2 border-[#dab74e] rounded-xl p-6 bg-white shadow-md"
            >
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {blog.content}
              </p>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}

export default Mainblog;
