import React from 'react'
import logo from "../assets/image5.png"
import logo1 from "../assets/image4.png"
import logo2 from "../assets/image1.png"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineRemoveRedEye } from "react-icons/md";//open
import { IoEyeOffOutline } from "react-icons/io5";//close
import axios from "axios"
import { serverUrl } from '../App'
import toast from 'react-hot-toast'
import { ClipLoader } from "react-spinners";

const SignIn = () => {
  const [inputClick, setInputClick] = useState({

    userName: false,

    password: false
  })
  const [showPassword, setShowPassword] = useState(false);
  const [loadiing, setLoading] = useState(false);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/auth/signin`,
        { userName, password }, { withCredentials: true });
      toast.success(res.data.message || "Signin Successfully");
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signin failed ❌"

      );
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-screen bg-gradient-to-b 
    from-black  to-gray-900 flex flex-col justify-center items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl 
            flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>

        <div className="md:w-[50%] h-full hidden lg:flex
justify-center items-center flex-col
bg-black text-white rounded-r-[30px]
shadow-2xl shadow-black px-10 text-center gap-8">

          {/* Logo */}
          <img
            src={logo1}
            alt="logo"
            className="w-[50%] max-w-[220px] drop-shadow-2xl"
          />

          {/* Divider */}
          <div className="w-[60px] h-[2px] bg-gradient-to-r from-yellow-400 to-pink-500  rounded-full"></div>

          {/* Tagline */}
          <p className="text-gray-300 text-lg font-medium leading-relaxed max-w-[300px]">
            Not Just a Platform,
            <span className="block text-white font-semibold">
              It's a VYBE ✨
            </span>
          </p>

        </div>


        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-6 gap-6">

          {/* Title */}
          <div className="flex items-center gap-2 text-2xl font-semibold mt-8">
            <span>Sign In to</span>
            <img className="w-[70px]" src={logo} alt="logo" />
          </div>



          {/* Username */}
          <div
            onClick={() => setInputClick({ ...inputClick, userName: true })}
            className="relative w-[90%] h-[50px] border-2 border-gray-300 rounded-xl flex items-center focus-within:border-blue-500 transition"
          >
            <label
              htmlFor="userName"
              className={`absolute left-4 bg-white px-1 text-gray-600 transition-all duration-200
      ${inputClick.userName ? "top-[-8px] text-xs text-blue-500" : "top-[13px] text-sm"}`}
            >
              Enter Your Username
            </label>

            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              onBlur={(e) =>
                setInputClick({ ...inputClick, userName: e.target.value !== "" })
              }
              className="w-full h-full px-4 outline-none rounded-xl"
            />
          </div>




          {/* Password */}
          <div
            onClick={() => setInputClick({ ...inputClick, password: true })}
            className="relative w-[90%] h-[50px] border-2 border-gray-300 rounded-xl flex items-center focus-within:border-blue-500 transition"
          >
            <label
              htmlFor="password"
              className={`absolute left-4 bg-white px-1 text-gray-600 transition-all duration-200
    ${inputClick.password ? "top-[-8px] text-xs text-blue-500" : "top-[13px] text-sm"}`}
            >
              Enter Your Password
            </label>

            <input
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              onBlur={(e) =>
                setInputClick({ ...inputClick, password: e.target.value !== "" })
              }
              className="w-full h-full px-4 pr-12 outline-none rounded-xl"
            />

            {/* Eye Icon */}
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-500 cursor-pointer text-xl"
            >
              {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
            </div>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignin}
            className="w-[90%] h-[50px] bg-gradient-to-r from-yellow-500 to-pink-600   text-white font-semibold rounded-xl transition hover:opacity-90"
          >
            {loadiing ? (<ClipLoader
              color="#ffffff"
              loading={loadiing}
              size={22}
              aria-label="Loading Spinner"
              data-testid="loader"
            />) : "Sign in"}
          </button>

          {/* Login Redirect */}
          <p className="text-sm text-gray-600">
            don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 cursor-pointer hover:underline">
              Sign up
            </Link>
          </p>

        </div>



      </div>
    </div>
  )
}

export default SignIn;
//2:48:02


