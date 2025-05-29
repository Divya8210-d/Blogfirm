import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Publish() {
  const [isOpen, setIsOpen] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [title,setTitle]=useState("")
  const [content,setContent]=useState("")
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  let savecount = 0;
  let publishcount = 0;


  //adding tags
  const handleAddTag = () => {
    if (tagInput && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };


  //removing tags 
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };



  //for saving draft
  const handleSaveDraft = async () => {
    const data = { title, content, tags }

    await axios.post("http://localhost:4000/api/v1/blog/save", data, { withCredentials: true })
      .then((res) => {
        toast.success("Blog Drafted")
        savecount++;
        setTitle("");
        setContent("");
        setTags([]);


      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An unknown error occurred");
      });






  };


  //publishing blog function
  const handlePublish = async () => {
    const data = { title, content, tags }
    await axios.post("http://localhost:4000/api/v1/blog/create", data, { withCredentials: true })
      .then((res) => {
        toast.success("Blog Published")
        publishcount++;
        setTitle("");
        setContent("");
        setTags([]);


      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An unknown error occurred");
      });


  };





  //autosave function
  const autosave = async () => {
    const data = { title, content, tags }

    await axios.post("http://localhost:4000/api/v1/blog/autosave", data, { withCredentials: true })
      .then((res) => {
        toast.success("Blog Auto-Saved in Draft")



      })

  }



//autosave when user is in inactivity after 5 secs
  useEffect(() => {
    let interval;

    if (isOpen && title && content) {
      interval = setInterval(() => {
        autosave();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, title, content,tagInput]);





// autodelete of  auto saved draft if user did not publish or save it to draft 
  const handleautodraftdelete = async (params) => {

    if (savecount == 0 && publishcount == 0) {
      await axios.post("http://localhost:4000/api/v1/blog/autodraftdelete", {}, { withCredentials: true })
        .then((res) => {
        })
    }

    else { return null }
  }



//handling of closing of publish tab
  const closeModal = () => { handleautodraftdelete(); navigate("/Home/blog"); }






  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 ">
      <ToastContainer position='top-center' />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative bg-gradient-to-b from-yellow-100">


        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X size={24} />
        </button>



        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create a Blog</h2>






        <input
          type="text"
          placeholder="Title of blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#dab74e]"
        />




        <textarea
          placeholder="Content of blog"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#dab74e]"
        />




        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add a tag (max 5)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? (e.preventDefault(), handleAddTag()) : null)}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dab74e]"
            />
            <button
              onClick={handleAddTag}
              className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Add
            </button>
          </div>



          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>


        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-yellow-100"
          >
            Save to Draft
          </button>




          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Publish
          </button>



        </div>
      </div>
    </div>
  );
}
