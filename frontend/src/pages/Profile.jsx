import React, { useState } from 'react'
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import { setProfileData, setUserData } from '../redux/slices/userSlice';
import { useEffect } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import toast from 'react-hot-toast';
import dp from "../assets/dp.webp";
import logo from "../assets/image4.png";
import Nav from '../components/Nav';
import { MdVerified } from "react-icons/md";
import FollowButton from '../components/FollowButton';
import Post from '../components/Post';


const Profile = () => {
    const dispatch = useDispatch();
    const { userName } = useParams();
    const { profileData, userData } = useSelector(state => state.user);
    const { postData } = useSelector(state => state.post);
    const [activeTab, setActiveTab] = useState("posts");

    const navigate = useNavigate();

    const handleProfile = async () => {
        try {
            const result = await axios.get(`${serverUrl}/user/getProfile/${userName}`, { withCredentials: true })
            dispatch(setProfileData(result.data.user));
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        handleProfile();
    }, [userName, dispatch])

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

    const dummyUsers = [
        "https://i.pravatar.cc/100?img=1",
        "https://i.pravatar.cc/100?img=2",
        "https://i.pravatar.cc/100?img=3",
        "https://i.pravatar.cc/100?img=4",
    ];

    const check = userData?.userName === profileData?.userName;

    const userPosts = postData.filter(post =>
        profileData?.posts?.includes(post._id)
    );

    const savedPosts = postData.filter(post =>
        userData?.saved?.some(
            s => (s._id || s).toString() === post._id.toString()
        )
    );

    return (
        <div className="w-full min-h-screen bg-black text-white">

            <header className="sticky top-0 z-50 w-full h-14 flex items-center justify-between px-5 
    bg-[#0b0b0b]/80 backdrop-blur-md border-b border-white/[0.06]">

                {/* LEFT */}
                <div className="flex-1">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center w-9 h-9 rounded-lg 
                hover:bg-white/[0.08] transition"
                    >
                        <MdOutlineKeyboardBackspace className="text-xl text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* CENTER */}
                <div className="flex-[2] text-center leading-tight">
                    <h2 className="text-sm font-semibold">
                        {profileData?.name || "Profile"}
                    </h2>
                    <span className="text-xs text-gray-400">
                        @{profileData?.userName || "profile"}
                    </span>
                </div>

                {/* RIGHT */}
                <div className="flex-1 flex justify-end items-center">
                    {check && userData?.userName === profileData?.userName ? (
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 text-[15px] hover:saturate-150 rounded-2xl 
                    bg-gradient-to-tr from-yellow-500 to-pink-600 transition active:scale-95"
                        >
                            Logout
                        </button>
                    ) : (
                        <img
                            src={logo}
                            alt="logo"
                            className="h-7 opacity-80 hover:opacity-100 transition"
                        />
                    )}
                </div>
            </header>


            {/* PROFILE SECTION */}
            <div className="w-full flex justify-center px-4 py-6">

                <div className="flex items-center gap-6 md:gap-10">

                    {/* IMAGE */}
                    <div className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] 
            rounded-full overflow-hidden p-[2px] 
            bg-gradient-to-tr from-pink-500 to-yellow-500">

                        <img
                            className="w-full h-full object-cover rounded-full"
                            src={profileData?.profileImage || dp}
                            alt="profile"
                        />
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col gap-1">

                        <h2 className="text-lg md:text-xl font-semibold flex gap-3  ">
                            {profileData?.name || "User"}

                            {check && <MdVerified className="text-blue-500 text-[20px] mt-1.5" />}
                        </h2>

                        <span className="text-sm text-gray-400">
                            @{profileData?.userName || "username"}
                        </span>

                        <p className="text-sm text-gray-300">
                            {profileData?.profession || "New User"}
                        </p>

                        {profileData?.bio && (
                            <p className="text-sm text-gray-400 max-w-[250px]">
                                {profileData?.bio}
                            </p>
                        )}
                    </div>

                </div>
            </div>

            {/* STATS (CENTERED BELOW) */}
            <div className="w-full flex justify-center gap-10 md:gap-16 py-5">

                {/* POSTS */}
                <div className="flex flex-col items-center gap-1">

                    {/* EMOJI + COUNT */}
                    <div className="flex items-center gap-1">

                        <p className="text-[20px] font-semibold">
                            {profileData?.posts?.length || 0}
                        </p>
                    </div>

                    <p className="text-xs text-gray-400">Posts</p>
                </div>

                {/* FOLLOWERS */}
                <div className="flex flex-col items-center gap-1">

                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-3">
                            {dummyUsers.slice(0, 3).map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt=""
                                    className="w-7 h-7 rounded-full border-2 border-black object-cover"
                                />
                            ))}
                        </div>

                        <p className="text-[20px] font-semibold">
                            {profileData?.followers?.length || 0}
                        </p>
                    </div>

                    <p className="text-xs text-gray-400">Followers</p>
                </div>

                {/* FOLLOWING */}
                <div className="flex flex-col items-center gap-1">

                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-3">
                            {dummyUsers.slice(1, 4).map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt=""
                                    className="w-7 h-7 rounded-full border-2 border-black object-cover"
                                />
                            ))}
                        </div>

                        <p className="text-[20px] font-semibold">
                            {profileData?.following?.length || 0}
                        </p>
                    </div>

                    <p className="text-xs text-gray-400">Following</p>
                </div>

            </div>

            {/* edit profile button + follow button and message button  */}
            <div className='w-full h-[80px] flex justify-center items-center gap-[20px]'>
                {
                    check && (
                        <>
                            <button
                                onClick={() => navigate("/editprofile")}
                                className='px-[10px] min-w-[150px] py-[5px] h-[40px] 
      bg-gradient-to-r from-pink-500 to-yellow-400 
      text-white font-medium
      rounded-2xl cursor-pointer
      hover:bg-gray-100 hover:scale-105
      transition duration-200'
                            >
                                Edit Profile
                            </button>

                        </>
                    )
                }


                {!check && (
                    <>

                        <FollowButton
                            targetUserId={profileData?._id}
                            tailwind="px-[10px] min-w-[150px] py-[5px] h-[40px]
  bg-gradient-to-r from-pink-500 to-yellow-400
  text-white font-bold rounded-2xl
  hover:opacity-90 transition hover:scale-105"
                        />

                        <button
                            className='px-[10px] min-w-[150px] py-[5px] h-[40px] 
  bg-white border border-gray-300 
  rounded-2xl text-black 
  hover:bg-gray-100 hover:scale-105
  cursor-pointer transition duration-200'
                        >
                            Message
                        </button>
                    </>
                )}
            </div>

            <div className='w-full min-h-[100vh] flex justify-center'>
                <div className='w-full max-w-[900px] flex flex-col items-center 
                rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[150px]'>

                    <Nav />

                    {
                        check && (
                            <div className="w-full flex justify-center mt-4">

                                <div className="flex bg-gray-100 rounded-full p-1 w-[90%] max-w-[500px]">

                                    {/* ALL POSTS */}
                                    <div
                                        onClick={() => setActiveTab("posts")}
                                        className={`flex-1 text-center py-2 rounded-full cursor-pointer text-sm font-semibold transition-all duration-300
                    ${activeTab === "posts"
                                                ? "bg-white text-black shadow-md"
                                                : "text-gray-500 hover:text-black"
                                            }`}
                                    >
                                        All Posts
                                    </div>

                                    {/* SAVED POSTS */}
                                    <div
                                        onClick={() => setActiveTab("saved")}
                                        className={`flex-1 text-center py-2 rounded-full cursor-pointer text-sm font-semibold transition-all duration-300
                    ${activeTab === "saved"
                                                ? "bg-white text-black shadow-md"
                                                : "text-gray-600 hover:text-black"
                                            }`}
                                    >
                                        Saved
                                    </div>

                                </div>

                            </div>
                        )
                    }

                    {/* ALL POSTS */}
                    {
                        activeTab === "posts" && (
                            userPosts.length > 0 ? (
                                userPosts.map((post, index) => (
                                    <Post key={index} post={post} />
                                ))
                            ) : (
                                <div className="w-full flex flex-col items-center justify-center py-20 gap-4">

                                    {/* ICON */}
                                    {check && <div className="w-[80px] h-[80px] flex items-center justify-center 
            rounded-full border-2 border-gray-300">
                                        <span className="text-4xl">📸</span>
                                    </div>}




                                    {check && <p className="text-sm text-gray-500 text-center max-w-[250px]">
                                        Start sharing your moments with the world 🚀
                                    </p>}
                                    {!check && (
                                        <p className="text-center max-w-[260px] leading-relaxed">
                                            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent font-semibold">
                                                No posts yet
                                            </span>
                                            <br />
                                            <span className="text-sm text-gray-500">
                                                This user hasn’t shared anything yet
                                            </span>
                                        </p>
                                    )}
                                    {/* BUTTON → REDIRECT */}
                                    {check && (
                                        <button
                                            onClick={() => navigate("/upload")}
                                            className="mt-4 px-6 py-2 rounded-full 
                    bg-gradient-to-r from-pink-500 to-yellow-400 
                    text-white text-sm font-medium 
                    hover:scale-105 transition"
                                        >
                                            Upload Your First Post
                                        </button>
                                    )}

                                </div>
                            )
                        )
                    }

                    {/* SAVED POSTS */}
                    {
                        activeTab === "saved" && (
                            savedPosts.length > 0 ? (
                                savedPosts.map((post, index) => (
                                    <Post key={index} post={post} />
                                ))
                            ) : (
                                <p className="text-gray-500 mt-10">No saved posts</p>
                            )
                        )
                    }





                </div>
            </div>
        </div>
    )
}

export default Profile;


