import  { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { X } from 'lucide-react'; 


export default function ReDraft({onClose, etitle="",econtent="",etags=[],eid=""}) {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState(etitle);
  const [id, setId] = useState(eid);
  const [content, setContent] = useState(econtent);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(etags);


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
  const handleSaveDraft =async  () => {
const data ={title,content,tags,id}

  await   axios.post("http://localhost:4000/api/v1/blog/redraft", data, { withCredentials: true })
      .then((res) => {
    toast.success("Blog Edited")
     
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An unknown error occurred");
      });

  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <ToastContainer position='top-center'/>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative">
        
          
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X size={24} />
        </button>   



        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Edit a Blog</h2>



          


        <input
          type="text"
          placeholder="Title of blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />



        
        <textarea
          placeholder="Content of blog"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />



  
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add a tag (max 5)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? (e.preventDefault(), handleAddTag()) : null)}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTag}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            Save to Draft
          </button>  



        

        </div>
      </div>
    </div>
  );
}
