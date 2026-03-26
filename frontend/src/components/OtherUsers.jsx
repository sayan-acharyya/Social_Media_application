import React from 'react'
import dp from "../assets/dp.webp"
import { Link } from 'react-router-dom'
import FollowButton from './FollowButton'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData, toggleFollow } from '../redux/slices/userSlice'
import axios from 'axios'
import { serverUrl } from '../App'
import toast from 'react-hot-toast'

const OtherUsers = ({ user }) => {
    const dispatch = useDispatch();
    const { userData, following, profileData } = useSelector(state => state.user);







    return (
        <div className='w-full flex items-center justify-between px-3 py-3 
        rounded-xl hover:bg-[#121212] transition-all duration-200 cursor-pointer'>

            {/* LEFT SIDE */}
            <Link to={`/profile/${user?.userName}`} className='flex items-center gap-3'>

                {/* profile image */}
                <div className='w-[42px] h-[42px] rounded-full overflow-hidden'>
                    <img
                        className='w-full h-full object-cover'
                        src={user?.profileImage || dp}
                        alt=""
                    />
                </div>

                {/* user info */}
                <div className='flex flex-col leading-tight'>

                    <span className='text-white text-sm font-semibold'>
                        @{user?.userName}
                    </span>

                    <span className='text-gray-400 text-xs'>
                        {user?.name}
                    </span>

                </div>

            </Link>


            {/* FOLLOW BUTTON */}

            <FollowButton
                targetUserId={user?._id}
                tailwind="px-4 py-[6px] text-xs font-semibold rounded-full 
  bg-[#1a1a1a] text-white hover:bg-gradient-to-r 
  hover:from-yellow-500 hover:to-pink-600 transition-all duration-300"
            />


        </div>
    )
}

export default OtherUsers