import React from 'react'
import logo from "../assets/image4.png";
import { FiHeart } from "react-icons/fi";
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import toast from 'react-hot-toast';
import { setUserData } from '../redux/slices/userSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import OtherUsers from './OtherUsers';
import { MdVerified } from 'react-icons/md';

const LeftHome = () => {

    const { userData, suggestedUsers } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {

            const res = await axios.get(`${serverUrl}/auth/signout`, {
                withCredentials: true
            });

            dispatch(setUserData(null));

            toast.success(res.data.message || "Signout Successfully");

            navigate("/signin");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "signout failed ❌"
            );

        }
    }

    return (
        <div
            className='
            w-[25%] hidden lg:block min-h-[100vh] bg-black 
            border-r-2 border-transparent
            bg-[linear-gradient(to_bottom,#eab308,#ec4899,#9333ea)]
            bg-[length:2px_100%] bg-no-repeat bg-right
        '>

            {/* LOGO and Heart */}
            <div className='w-full h-[100px] flex items-center justify-between p-[20px]'>
                <img
                    className='w-[100px]'
                    src={logo}
                    alt=""
                />

                <FiHeart className='text-pink-500 w-[25px] h-[25px]' />
            </div>

            {/* Profile + Logout */}
            <div className='flex items-center w-full justify-between gap-[10px] pb-2'>

                <div className='flex items-center gap-2'>

                    <Link to={`/profile/${userData?.userName}`} className='ml-2 w-[60px] h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                        <img
                            className='w-full h-full object-cover'
                            src={userData?.profileImage || dp}
                            alt=""
                        />
                    </Link>

                    <div className="flex flex-col">

                        <div className="flex items-center gap-2">

                            <span className="text-white font-semibold text-md tracking-wide">
                                @{userData?.userName}
                            </span>
                            <MdVerified className="text-blue-500 text-[20px]  " />

                        </div>

                        <span className="text-gray-400 text-xs">
                            {userData?.name}
                        </span>

                    </div>

                </div>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-semibold text-white rounded-lg 
                    bg-gradient-to-r from-yellow-500 to-pink-600  
                    hover:scale-105 transition-all duration-300 mr-3 shadow-lg font-bold">
                    Log Out
                </button>

            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400 via-pink-500 to-transparent my-4"></div>

            {/* suggested user */}
            <div className='w-full flex flex-col gap-[20px]  pl-3'>
                <h1 className="text-[20px] font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Suggested Users
                </h1>
                {
                    suggestedUsers?.slice(0, 5).map((user) => (
                        <OtherUsers key={user._id} user={user} />
                    ))
                }
            </div>




        </div>
    )
}

export default LeftHome