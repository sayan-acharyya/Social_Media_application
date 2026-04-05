import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.webp"
import { FiSend } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useEffect } from 'react';
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

    return (
        <div className='w-full h-[100vh] bg-black relative flex flex-col'>

            {/* 🔥 HEADER */}
            <div className='fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10'>

                <div className='max-w-[800px] mx-auto flex items-center justify-between px-3 py-2'>

                    {/* LEFT */}
                    <div className='flex items-center gap-3'>

                        {/* BACK */}
                        <div
                            onClick={() => navigate(-1)}
                            className='p-2 rounded-full hover:bg-white/10 cursor-pointer transition active:scale-95'
                        >
                            <MdOutlineKeyboardBackspace className='text-white text-[22px]' />
                        </div>

                        {/* USER */}
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
            </div>

            {/* 🔥 CHAT AREA SPACE */}
            <div className='flex-1 pt-[70px] pb-[80px]'>


            </div>

            {/* 🔥 INPUT BAR */}
            <div className='fixed bottom-3 left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 py-2'>

                <div className='mx-auto max-w-[800px] px-3'>

                    <form className='w-full h-[45px] rounded-full 
                        bg-[#131616] flex items-center gap-3 px-4 
                        focus-within:ring-1 focus-within:ring-pink-500 transition'>

                        {/* INPUT */}
                        <input
                            type="text"
                            placeholder='Message...'
                            className='flex-1 bg-transparent text-white text-sm outline-none placeholder:text-gray-500'
                        />
                        {/* image sending  */}
                        <button
                            className='p-2 cursor-pointer rounded-full text-white
                            text-black hover:opacity-90 active:scale-95 transition'
                        >
                            <FaRegImage className='text-[18px]' />
                        </button>
                        {/* SEND BUTTON */}
                        <button
                            type="submit"
                            className='px-3 py-2 cursor-pointer rounded-full bg-gradient-to-tr from-pink-600 to-yellow-400 
                            text-black hover:opacity-90 active:scale-95 transition font-bold'
                        >
                            <FiSend className='text-[19px] text-black ' />
                        </button>



                    </form>

                </div>
            </div>

        </div>
    )
}

export default MessageArea