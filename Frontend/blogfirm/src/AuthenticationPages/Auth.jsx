import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from "react-toastify";


export default function Auth() {
  const [activeTab, setActiveTab] = useState('login');//for switching the tabs beetween the login and register

  return (
   <div className="min-h-[600px] flex items-center justify-center bg-transparent">
    <ToastContainer position='top-center' />



    <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl shadow-lg overflow-hidden"
      >
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-10 bg-white/40 backdrop-blur rounded-t-lg shadow-md"></div>
        <div className="flex border-b border-gray-300">
            {['login', 'register'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-1/2 py-3 text-center font-semibold text-white transition-colors border-b-2 ${activeTab === tab ? 'border-orange-600' : 'border-transparent'
                  }`}
              >
                {tab === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-10 pt-4 min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LoginForm />
              </motion.div>
            ) : (
              <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <RegisterForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

const Input = ({ label, id, ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      id={id}
      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-200 ease-in-out bg-white/80 hover:shadow-inner"
      {...props}
    />
  </div>
);



const Button = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="w-full py-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
    {...props}
  >
    {children}
  </motion.button>
);




//loginform
const LoginForm = () => {
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");
  const navigate = useNavigate();

//login handler
  const login = (e) => {
    e.preventDefault();
    const data = { email: lemail, password: lpassword };
    axios.post("https://blogfirm.onrender.com/api/v1/users/login", data, { withCredentials: true })
      .then((res) => {
        toast.success("Logged in")
        setLemail("");
        setLpassword("");
        localStorage.setItem("logged", JSON.stringify(res.data.data.user));
        setTimeout(() => {
          navigate("/Home/blog");
        }, 3000);

      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An unknown error occurred");
      });
  };

  return (
    <form onSubmit={login}>

      <Input label="Email" id="login-email" type="email" value={lemail} onChange={(e) => setLemail(e.target.value)} required />
      <Input label="Password" id="login-password" type="password" value={lpassword} onChange={(e) => setLpassword(e.target.value)} required />
      <Button type="submit">Login</Button>
    </form>
  );
};




//register form
const RegisterForm = () => {
  const [remail, setRemail] = useState("");
  const [username, setUsername] = useState("");
  const [rpassword, setRpassword] = useState("")
  const data = { username, email: remail, password: rpassword };



  //register handler
  const register = (e) => {
    e.preventDefault();


    axios.post("https://blogfirm.onrender.com/api/v1/users/register", data)
      .then(() => {
        toast.success("Registered");
        setUsername(""); setRemail(""); setRpassword("");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An unknown error occurred");
      });
  };



  return (
    <form onSubmit={register} className="space-y-4">
      <Input label="Username" id="register-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <Input label="Email" id="register-email" type="email" value={remail} onChange={(e) => setRemail(e.target.value)} required />

      <Input label="Password" id="register-password" type="password" value={rpassword} onChange={(e) => setRpassword(e.target.value)} required />
      <Button type="submit">Register</Button>
    </form>
  );
};
