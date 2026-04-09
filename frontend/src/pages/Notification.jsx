import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import loop from "../assets/loop.jpg"
import dp from "../assets/dp.webp"
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { serverUrl } from '../App';
import { deleteNotificationLocal, markAsReadLocal } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';

const Notification = () => {
    const navigate = useNavigate();
    const { notificationData } = useSelector(state => state.user);
    const unreadCount = notificationData?.filter(item => !item.isRead).length;

    const dispatch = useDispatch();

    const handleMarkAsRead = async (id) => {
        try {
            await axios.patch(`${serverUrl}/user/markAsRead/${id}`, {}, {
                withCredentials: true
            });

            // ✅ instant UI update
            dispatch(markAsReadLocal(id));
            toast.success("Marked as read");

        } catch (error) {
            console.log("Error marking as read", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${serverUrl}/user/deleteNotification/${id}`, {
                withCredentials: true
            });

            dispatch(deleteNotificationLocal(id)); // instant UI update
            toast.success("Notification deleted");

        } catch (error) {
            console.log("Delete error", error);
            toast.error("Failed to delete");
        }
    };

    return (
        <div className='w-full h-screen bg-black flex flex-col text-white'>

            {/* Header */}
            <div className="w-full flex items-center gap-4 px-4 py-4 border-b border-gray-800 bg-black">
                <MdOutlineKeyboardBackspace
                    className="text-white cursor-pointer w-6 h-6 hover:scale-110 transition-transform"
                    onClick={() => navigate("/")}
                />
                <h1 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                    Notifications
                </h1>

                {unreadCount > 0 && <div className='text-white px-2 py-0.5 bg-gradient-to-r from-pink-400 to-yellow-500 rounded-2xl text-sm font-semibold'>
                    {notificationData?.filter(item => !item.isRead).length || 0} unread
                </div>}
            </div>

            {/* Notification List */}
            <div className='flex-1 overflow-y-auto no-scrollbar px-3 py-3 space-y-3'>

                {notificationData?.length === 0 ? (
                    <div className='text-gray-500 text-center mt-10'>
                        No notifications yet 😴
                    </div>
                ) : (
                    notificationData?.map((item) => (
                        <div
                            key={item._id}
                            className='flex flex-col gap-3 p-4 rounded-2xl bg-[#111] border border-gray-900 hover:border-gray-700 transition'
                        >
                            <div className='flex items-start justify-between gap-3'>
                                {/* LEFT SIDE: Profile & Info */}
                                <div className='flex items-center gap-3'>
                                    <img
                                        onClick={() => navigate(`/profile/${item.sender?.userName}`)}
                                        src={item.sender?.profileImage || dp}
                                        alt=""
                                        className='w-12 h-12 rounded-full object-cover border border-gray-800'
                                    />

                                    <div className='flex flex-col'>
                                        <span className='text-sm'>
                                            <span className='font-bold text-gray-100'>
                                                {item.sender?.userName}
                                            </span>{" "}
                                            <span className='text-gray-300'>{item.message}</span>
                                        </span>
                                        <span className='text-xs text-blue-400 mt-1 font-medium'>
                                            {item.type === "like" && "❤️ Liked your post"}
                                            {item.type === "comment" && "💬 Commented on your loop"}
                                        </span>
                                    </div>
                                </div>

                                {/* RIGHT SIDE: Preview Image (if any) */}
                                {(item.post || item.loop) && (
                                    <img
                                        src={item.post?.media || loop}
                                        alt=""
                                        className='w-12 h-12 rounded-lg object-cover border border-gray-800'
                                    />
                                )}
                            </div>

                            {/* BOTTOM SIDE: Individual Action Button */}
                          <div className='flex justify-end border-t border-gray-800 pt-3 mt-1 gap-2'>

                                {/* Mark as read */}
                                {!item.isRead && (
                                    <button
                                        onClick={() => handleMarkAsRead(item._id)}
                                        className='text-xs font-semibold py-1.5 px-4 rounded-full bg-white text-black hover:bg-gray-200 transition-all active:scale-95'
                                    >
                                        Mark as read     
                                    </button>
                                )}

                                {/* 🔥 Delete */}
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className='text-xs font-semibold py-1.5 px-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all active:scale-95'
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default Notification