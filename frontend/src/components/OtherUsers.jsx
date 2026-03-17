import React from 'react'
import dp from "../assets/dp.webp"

const OtherUsers = ({ user }) => {
    return (
        <div className='w-full flex items-center justify-between px-3 py-3 
        rounded-xl hover:bg-[#121212] transition-all duration-200 cursor-pointer'>

            {/* LEFT SIDE */}
            <div className='flex items-center gap-3'>

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

            </div>


            {/* FOLLOW BUTTON */}
            <button className='px-4 py-[6px] text-xs font-semibold rounded-full 
            bg-[#1a1a1a] text-white hover:bg-gradient-to-r 
            hover:from-yellow-500 hover:to-pink-600 transition-all duration-300'>
                Follow
            </button>

        </div>
    )
}

export default OtherUsers