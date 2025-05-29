import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  async function getuser() {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user", { withCredentials: true });
      setUsername(res.data.data.username);
    } catch (err) {
      toast.error("Something went wrong while fetching user");
    }
  }

  useEffect(() => {
    getuser();
  }, []);

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("loggeduser");
      toast.success("Logged out")
    setTimeout(() => {
        navigate("/")
    }, 3000);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-[#dab74e] shadow-md">
      <ToastContainer position="top-center" />
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Left: Navigation + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Hamburger - shown on small screens */}
          <button 
            className="text-white md:hidden" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Nav Links - hidden on small screens */}
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
    onClick={() => navigate("/Home/publish")}
  >
    Create a Blog
  </li>
</ul>
        </div>

        {/* Right: Username & Logout */}
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

      {/* Dropdown Menu for Small Screens */}
      {menuOpen && (
        <div className="md:hidden bg-[#dab74e] px-6 py-3 space-y-3 text-white text-lg font-medium shadow-md">
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/Home/blog"); setMenuOpen(false); }}>All Blogs</div>
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/Home/draft"); setMenuOpen(false); }}>Drafts</div>
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/Home/userpost"); setMenuOpen(false); }}>Posted</div>
          <div className="cursor-pointer hover:underline" onClick={() => { navigate("/Home/publish"); setMenuOpen(false); }}>Create a Blog</div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
