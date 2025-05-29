import Auth from "./Auth.jsx";
import blogperson from "./blogperson.png";
import { motion } from "framer-motion";


function Main() {

  return (
    <div
  className="bg-[#dab74e] min-h-screen relative font-sans  ">
  
<motion.h1       initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1 }} className="absolute top-[18%] md:top-[20%] lg:top-[10%] left-[50%] md:left-[40%] lg:left-[60%] 
               text-[20vw] md:text-[200px] font-bold text-gray- opacity-30 blur-sm select-none 
               leading-none z-0 max-h-screen">
  Blog
</motion.h1>

<motion.h1    initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }} className="absolute top-[60%] md:top-[80%] lg:top-[75%] left-[40%] md:left-[65%] lg:left-[73%] 
               text-[15vw] md:text-[100px] font-bold text-gray- opacity-30 blur-sm select-none 
               leading-none z-0 max-h-screen">
  Content
</motion.h1>

<motion.h1   initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }} className="absolute top-[90%] md:top-[82%] lg:top-[78%] left-[10%] md:left-[15%] lg:left-[30%] 
               text-[10vw] md:text-[100px] font-bold text-gray- opacity-30 blur-sm select-none 
               leading-none z-0 max-h-screen">
  Idea
</motion.h1>

{/* Page title */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 gap-12 lg:gap-0">
     
        <div className="text-white flex flex-col gap-4 max-w-xl">
          <motion.h1       initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} className="text-[12vw] md:text-[120px] font-extrabold leading-none">
            Blogfirm
          </motion.h1>
          <motion.p       initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} className="text-[4vw] md:text-[30px] font-medium leading-tight">
            A blog posting platform where you can<br />
            draft & publish blogs about anything.
          </motion.p>
        </div>




        {/* Right side: Auth component */}
        <div className="w-full max-w-sm z-10">
          <Auth />
        </div>
      </div>

      



    {/* Blog person image */}
<motion.div         initial={{ opacity: 0,  }}
        animate={{ opacity: 1,  }}
        transition={{ duration: 1, delay: 0.5 }} className="w-[80vw] max-w-[600px] mx-auto  lg:mt-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-10">
  <img src={blogperson} className="w-full h-auto" alt="Blog Person" />
</motion.div>

    </div>



  );
}

export default Main;
