import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { RxVideo } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import dp from "../assets/dp.webp"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
    const { userData } = useSelector(state => state.user)
    return (
        <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex 
        justify-around items-center fixed bottom-[20px] rounded-full
        shadow-2xl shadow-[#000000] z-[100]'>

            {/* Home */}
            <Link
            to={"/"}
            className="relative group cursor-pointer">
                <GoHomeFill className='text-white w-[26px] h-[26px]' />
                <span className="absolute bottom-[45px] left-1/2 -translate-x-1/2 
                bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 
                group-hover:opacity-100 transition">
                    Home
                </span>
            </Link>

            {/* Search */}
            <div className="relative group cursor-pointer">
                <IoSearchOutline className='text-white w-[26px] h-[26px]' />
                <span className="absolute bottom-[45px] left-1/2 -translate-x-1/2 
                bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 
                group-hover:opacity-100 transition">
                    Search
                </span>
            </div>

            {/* Post */}
            <div className="relative group cursor-pointer">
                <FaPlus className='text-white w-[26px] h-[26px]' />
                <span className="absolute bottom-[45px] left-1/2 -translate-x-1/2 
                bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 
                group-hover:opacity-100 transition">
                    Post
                </span>
            </div>

            {/* Reels */}
            <div className="relative group cursor-pointer">
                <RxVideo className='text-white w-[28px] h-[28px]' />
                <span className="absolute bottom-[45px] left-1/2 -translate-x-1/2 
                bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 
                group-hover:opacity-100 transition">
                    Reels
                </span>
            </div>

            {/* Profile */}
            <Link
                to={`/profile/${userData?.userName}`}
                className="relative group cursor-pointer">
                <div className='ml-2 w-[40px] h-[40px] border-2 border-black rounded-full overflow-hidden'>
                    <img
                        className='w-full h-full object-cover'
                        src={dp}
                        alt=""
                    />
                </div>

                <span className="absolute bottom-[45px] left-1/2 -translate-x-1/2 
                bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 
                group-hover:opacity-100 transition">
                    Profile
                </span>
            </Link>

        </div>
    )
}

export default Nav