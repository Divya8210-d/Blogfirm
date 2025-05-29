import Navbar from "./Navbar"
import { Outlet ,useNavigate,useLocation} from "react-router"
import Publish from "./CreateBlog";
function Home(params) {



  const location = useLocation();
  const navigate = useNavigate();

  const ispublish = location.pathname.endsWith("/publish");

  const closeModal = () => navigate("/Home/blog");









    return(<><Navbar/>
    <Outlet/>
    
      {ispublish && (
        <Publish onClose={closeModal} /> // 👈 make sure your modal supports `onClose`
      )}</>)
}

export default Home