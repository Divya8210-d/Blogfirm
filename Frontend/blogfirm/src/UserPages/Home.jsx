import Navbar from "./Navbar"
import { Outlet ,useNavigate,useLocation} from "react-router"
import Create from "./CreateBlog";


function Home(params) {

  // for routing to create a blog pop-up
const location = useLocation();
const navigate = useNavigate();
const iscreate = location.pathname.endsWith("/create");
const closeModal = () => navigate("/Home/blog");


return(<><Navbar/>
    <Outlet/>
    
      {iscreate && (
        <Create /> 
      )}</>)
}

export default Home