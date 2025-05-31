import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);



//handler for getting the user name
  async function getuser() {
    try {
      const res = await axios.get("https://blogfirm.onrender.com/api/v1/users", { withCredentials: true });
      setUsername(res.data.data.username);
    } catch (err) {
      toast.error(err.response?.data?.message||"Something went wrong while fetching user");
    }
  }



  useEffect(() => {
    getuser();
  }, []);


  //handler for logout
  const logout = async () => {
    try {
      await axios.post("https://blogfirm.onrender.com/api/v1/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("loggeduser");
      toast.success("Logged out")
    setTimeout(() => {
        navigate("/")
    }, 3000);
    } catch (err) {  toast.error(err.response?.data?.message||"Log out failed");
    
    }
  };

  return (
    <div className="bg-[#dab74e] shadow-md">
      <ToastContainer position="top-center" />
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        
        <div className="flex items-center gap-4">
      
          <button 
            className="text-white md:hidden" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          
       <ul className="hidden md:flex gap-6 text-white font-medium text-lg">
  <li
    className="cursor-pointer px-2 py-1 rounded-lg transition duration-200 hover:bg-white hover:text-[#dab74e] hover:scale-105"
    onClick={() => navigate("/Home/blog")}
  >
    All Blogs
  </li>
  <li
    className="cursor-pointer px-2 py-1 rounded-lg transition duration-200 hover:bg-white hover:text-[#dab74e] hover:scale-105"
    onClick={() => navigate("/Home/draft")}
  >
    Drafts
  </li>
  <li
    className="cursor-pointer px-2 py-1 rounded-lg transition duration-200 hover:bg-white hover:text-[#dab74e] hover:scale-105"
    onClick={() => navigate("/Home/userpost")}
  >
    Posted
  </li>
  <li
    className="cursor-pointer px-2 py-1 rounded-lg transition duration-200 hover:bg-white hover:text-[#dab74e] hover:scale-105"
    onClick={() => navigate("/Home/create")}
  >
    Create a Blog
  </li>
</ul>
        </div>

  
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold text-sm sm:text-base">👋Hi {username}</span>
          <button
            onClick={logout}
            className="bg-white text-[#dab74e] font-bold px-3 py-2 rounded-lg hover:bg-yellow-100 transition text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>


      {menuOpen && (
        <div className="md:hidden bg-[#dab74e] px-6 py-3 space-y-3 text-white text-lg font-medium shadow-md">
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/Home/blog"); setMenuOpen(false); }}>All Blogs</div>
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/Home/draft"); setMenuOpen(false); }}>Drafts</div>
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/Home/userpost"); setMenuOpen(false); }}>Posted</div>
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/Home/create"); setMenuOpen(false); }}>Create a Blog</div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
