import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import logo from "../assets/image4.png";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { LuSend } from "react-icons/lu";
import { useNavigate, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import dp from "../assets/dp.webp";
import { MdVerified } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../App";
import { setUserData } from "../redux/slices/userSlice";
import OtherUsers from "./OtherUsers";
import { IoMdClose } from "react-icons/io";
import { BiMessageAltDetail } from "react-icons/bi";

const Feed = () => {
    const { postData } = useSelector(state => state.post);
    const { userData, suggestedUsers, notificationData } = useSelector(state => state.user);
    const { storyList, storyData } = useSelector(state => state.story);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openSidebar, setOpenSidebar] = useState(false);

    // 🔥 logout
    const handleLogout = async () => {
        try {
            const res = await axios.get(`${serverUrl}/auth/signout`, {
                withCredentials: true
            });

            dispatch(setUserData(null));
            toast.success(res.data.message || "Signout Successfully");
            navigate("/signin");

        } catch (error) {
            toast.error(error.response?.data?.message || "signout failed ❌");
        }
    };

    return (
        <div className="lg:w-[50%] w-full bg-black h-screen relative overflow-y-auto no-scrollbar">

            {/* 🔥 MOBILE SIDEBAR (CUSTOM) */}
            <div className={`fixed top-0 left-0 h-full w-[80%] z-50 bg-black transform transition-transform duration-300 
                ${openSidebar ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>

                {/* HEADER */}
                <div className="w-full h-[80px] flex items-center justify-between px-4 border-b border-zinc-800">
                    <img className="w-[100px]" src={logo} alt="" />
                    <IoMdClose
                        onClick={() => setOpenSidebar(false)}
                        className="cursor-pointer text-pink-500 w-[24px] h-[24px]" />
                </div>

                {/* PROFILE */}
                <div className="flex items-center justify-between px-3 py-4">

                    <div className="flex items-center gap-2">

                        <Link to={`/profile/${userData?.userName}`}>
                            <div className="w-[55px] h-[55px] rounded-full overflow-hidden border">
                                <img
                                    src={userData?.profileImage || dp}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                            </div>
                        </Link>

                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="text-white font-semibold text-sm">
                                    @{userData?.userName}
                                </span>
                                <MdVerified className="text-blue-500 text-[16px]" />
                            </div>

                            <span className="text-gray-400 text-xs">
                                {userData?.name}
                            </span>
                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 text-xs text-white border border-gray-600 rounded-md hover:bg-zinc-900"
                    >
                        Log Out
                    </button>
                </div>

                {/* DIVIDER */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent my-2"></div>

                {/* SUGGESTED USERS */}
                <div className="px-3 py-2 h-[65%] flex flex-col gap-3">

                    <h1 className="text-[16px] font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Suggested Users
                    </h1>

                    <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar pr-2">
                        {
                            suggestedUsers?.map((user) => (
                                <OtherUsers key={user._id} user={user} />
                            ))
                        }
                    </div>

                </div>
            </div>

            {/* 🔥 OVERLAY */}
            {
                openSidebar && (
                    <div
                        onClick={() => setOpenSidebar(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )
            }

            {/* 🔥 HEADER */}
            <div className="w-full h-[70px] flex items-center justify-between px-[15px] lg:hidden border-b border-zinc-800">

                <img className="w-[100px]" src={logo} alt="logo" />

                <div className="flex gap-4 items-center">

                    {/* <FiHeart className="text-pink-500 w-[24px] h-[24px] cursor-pointer transition" /> */}
                    <div className='relative cursor-pointer'>
                        <FiHeart  onClick={()=>navigate("/notifications")} className='text-pink-500 w-[25px] h-[25px]' />
                        {notificationData.length > 0 && notificationData.some((noti) => noti.isRead === false) && <div className='w-[9px] h-[9px] bg-blue-600 rounded-full absolute top-0 right-0'></div>}


                    </div>

                    <LuSend
                        onClick={() => navigate("/messages")}
                        className="text-blue-400 w-[24px] h-[24px] cursor-pointer transition"
                    />


                    <div
                        onClick={() => setOpenSidebar(prev => !prev)}
                        className='ml-2 w-[40px] h-[40px] border-2 border-black rounded-full overflow-hidden'>
                        <img
                            className='w-full h-full object-cover cursor-pointer'
                            src={userData?.profileImage || dp}
                            alt=""
                        />
                    </div>
                </div>
            </div>

            {/* 🔥 STORIES */}
            <div className="flex w-full overflow-x-auto gap-[20px] items-center p-[20px] no-scrollbar">
                <StoryDp
                    userName={"Your Story"}
                    profileImage={userData?.profileImage}
                    story={storyData}
                />

                {storyList?.map((story, index) => (
                    <StoryDp
                        key={index}
                        userName={story.author.userName}
                        profileImage={story.author.profileImage}
                        story={story}
                    />
                ))}
            </div>

            {/* 🔥 FEED */}
            <div className="w-full min-h-[100vh] flex flex-col items-center 
                gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] pb-[120px]">

                <Nav />

                {
                    postData?.map((post, index) => (
                        <Post key={index} post={post} />
                    ))
                }

            </div>

        </div>
    );
};

export default Feed;