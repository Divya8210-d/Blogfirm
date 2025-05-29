import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Outlet ,useNavigate,useLocation} from "react-router"
import ReDraft from './ReDraft';

export default function Draft() {
  const [blogs, setBlogs] = useState([]);

  const [edit,setEdit] = useState(false)

const [selectedBlog, setSelectedBlog] = useState(null);





  const location = useLocation();
  const navigate = useNavigate();
  const blogToEdit = location.state?.blog;

  const isdraft = location.pathname.endsWith("/edit");

  const closeModal = () => {navigate("/Home/draft"); getDraft()};

 const deletedraft = async (id) => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/blog/deletedraft",{id}, {
        withCredentials: true
      });
      toast.success("Draft deleted")
      getDraft()
    } catch (err) {
      toast.error("Something went wrong while deleting your post");
    }
 } 
  
const handlePublish = async (blog) => {
  if (!blog) return;

  const data = {
    title: blog.title,
    content: blog.content,
    tags: blog.tags
  };

  try {
    await axios.post("http://localhost:4000/api/v1/blog/publish", data, { withCredentials: true });
    toast.success("Blog Published");
    getDraft(); // refresh draft list
  } catch (err) {
    toast.error(err.response?.data?.message || "An unknown error occurred");
  }
};

  
  const getDraft = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/blog/userdraft", {
        withCredentials: true
      });
      setBlogs(res.data.data);
    } catch (err) {
      toast.error("Something went wrong while fetching drafts");
    }
  };

  useEffect(() => {
    getDraft();
  }, []);

  // === Animation Variants ===
  const headingContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  const cardContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const card = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { type: "spring", stiffness: 100, damping: 14 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const headingText = "📝 Your Draft Blogs";

  return (
    <div className="bg-gradient-to-b from-yellow-100 to-white min-h-screen py-10 px-4 sm:px-10">
      <ToastContainer position="top-center" />

      {/* Animated Heading */}
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-10"
        variants={headingContainer}
        initial="hidden"
        animate="visible"
      >
        {headingText.split("").map((char, index) => (
          <motion.span key={index} variants={letter}>
            {char}
          </motion.span>
        ))}
      </motion.h1>

      {blogs.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          You haven't saved any drafts yet.
        </motion.p>
      ) : (
        <motion.div
          className="flex flex-col gap-8"
          variants={cardContainer}
          initial="hidden"
          animate="visible"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              className="bg-white border-2 border-[#dab74e] rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 w-full"
              variants={card}
            >
              <motion.h2
                className="text-2xl font-bold  text-yellow-800 mb-3"
                variants={fadeIn}
              >
                {blog.title}
              </motion.h2>

              <motion.div
                className="text-gray-800 text-base mb-4 whitespace-pre-line max-h-64 overflow-auto pr-2"
                variants={fadeIn}
              >
                {blog.content}
              </motion.div>

              {blog.tags && blog.tags.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  variants={fadeIn}
                >
                  {blog.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium"
                      whileHover={{ scale: 1.1 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </motion.div>
              )}

              <motion.div
                className="flex justify-end gap-3 mt-4"
                variants={fadeIn}
              >        <motion.button
                  onClick={() =>{
                  handlePublish(blog)
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition"
                  whileTap={{ scale: 0.95 }}
                >
                  Publish
                </motion.button>

                <motion.button
                  onClick={() =>{
                    setEdit(true)
                    navigate("Home/draft/edit",{ state:  {blog}  })
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg transition"
                  whileTap={{ scale: 0.95 }}
                >
                  Edit Draft
                </motion.button>
                <motion.button
                  onClick={() => {deletedraft(blog._id)}}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                  whileTap={{ scale: 0.95 }}
                >
                  Delete Draft
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}


 {isdraft && blogToEdit && (
  <ReDraft
    onClose={closeModal}
    etitle={blogToEdit.title}
    econtent={blogToEdit.content}
    etags={blogToEdit.tags}
    eid={blogToEdit._id}
  />
)}
      
    </div>
  );
}
