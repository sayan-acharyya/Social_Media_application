import React, { useEffect } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.webp"
import { FiSend } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa6";
import { setSelectedUser } from '../redux/slices/messageSlice';

const MessageArea = () => {
    const { selectedUser } = useSelector(state => state.message);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedUser) {
            const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
            if (storedUser) {
                dispatch(setSelectedUser(storedUser));
            }
        }
    }, []);

    // 🔥 DEMO MESSAGES


    return (
        <div className='w-full h-[100vh] bg-black flex flex-col'>

            {/* 🔥 HEADER */}
            <div className='fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10'>
                <div className='max-w-[800px] mx-auto flex items-center gap-3 px-3 py-2'>

                    <div
                        onClick={() => navigate(-1)}
                        className='p-2 rounded-full hover:bg-white/10 cursor-pointer'
                    >
                        <MdOutlineKeyboardBackspace className='text-white text-[22px]' />
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='w-[38px] h-[38px] rounded-full overflow-hidden border border-white/10'>
                            <img
                                className='w-full h-full object-cover'
                                src={selectedUser?.profileImage || dp}
                                alt=""
                            />
                        </div>

                        <div className='flex flex-col leading-tight'>
                            <span className='text-white text-sm font-semibold'>
                                {selectedUser?.name || "User"}
                            </span>
                            <span className='text-gray-400 text-xs'>
                                @{selectedUser?.userName}
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* 🔥 CHAT AREA */}
            <div className='flex-1 pt-[70px] pb-[90px] overflow-y-auto no-scrollbar px-3 
                max-w-[800px] mx-auto w-full flex flex-col gap-3
                scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent  '>



            </div>

            {/* 🔥 INPUT BAR */}
            <div className='fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 py-2'>
                <div className='mx-auto max-w-[800px] px-3'>

                    <form className='w-full h-[45px] rounded-full 
                        bg-[#131616] flex items-center gap-3 px-4 
                        focus-within:ring-1 focus-within:ring-pink-500'>

                        <input
                            type="text"
                            placeholder='Message...'
                            className='flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-500'
                        />

                        <button className='p-2 text-white'>
                            <FaRegImage className='text-[18px]' />
                        </button>

                        <button
                            type="submit"
                            className='px-3 py-2 rounded-full bg-gradient-to-tr from-pink-600 to-yellow-400 text-black'
                        >
                            <FiSend className='text-[18px]' />
                        </button>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default MessageArea;


//4:56:15