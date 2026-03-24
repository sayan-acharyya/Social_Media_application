import React from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6"

const Post = ({ postData }) => {

    const { userData } = useSelector(state => state.user);

    const check = userData?._id !== postData.author?._id;

    const isLiked = postData.likes.some(
        id => id.toString() === userData?._id
    );

    const isSaved = postData.saved?.some(
        id => id.toString() === userData?._id
    );

    return (
        <div className='w-[90%] max-w-[500px] bg-white 
        flex flex-col rounded-2xl shadow-lg overflow-hidden'>

            {/* HEADER */}
            <div className='w-full flex justify-between items-center px-4 py-3'>

                <div className="flex items-center gap-3 cursor-pointer">

                    {/* Profile */}
                    <div className="w-[45px] h-[45px] rounded-full overflow-hidden border">
                        <img
                            src={postData.author?.profileImage || dp}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col leading-tight">
                        <span className="text-gray-900 font-semibold text-sm">
                            {postData.author?.userName || "username"}
                        </span>
                        <span className="text-gray-500 text-xs">
                            {postData.author?.name || "name"}
                        </span>
                    </div>
                </div>

                {/* Follow Button */}
                {check && (
                    <button className='px-4 py-1.5 text-sm font-semibold 
                    bg-blue-500 text-white rounded-full hover:bg-blue-600 
                    transition'>
                        Follow
                    </button>
                )}
            </div>

            {/* MEDIA */}
            <div className="w-full bg-black">
                {postData.mediaType === "image" && (
                    <img
                        src={postData.media}
                        alt="post"
                        className="w-full max-h-[500px] object-cover"
                    />
                )}

                {postData.mediaType === "video" && (
                    <video
                        src={postData.media}
                        controls
                        className="w-full max-h-[500px] object-cover"
                    />
                )}
            </div>

            {/* ACTION BAR */}
            <div className="w-full flex justify-between items-center px-4 py-3">

                {/* LEFT */}
                <div className="flex items-center gap-6">

                    {/* LIKE */}
                    <div className="flex items-center gap-2 cursor-pointer group active:scale-90 transition">
                        {isLiked ? (
                            <GoHeartFill className="w-6 h-6 text-red-500 group-hover:scale-110 transition" />
                        ) : (
                            <GoHeart className="w-6 h-6 text-gray-700 group-hover:text-red-500 group-hover:scale-110 transition" />
                        )}
                        <span className="text-sm font-medium text-gray-700">
                            {postData.likes.length}
                        </span>
                    </div>

                    {/* COMMENT */}
                    <div className="flex items-center gap-2 cursor-pointer group active:scale-90 transition">
                        <FaRegComment className="w-6 h-6 text-gray-700 group-hover:text-blue-500 group-hover:scale-110 transition" />
                        <span className="text-sm font-medium text-gray-700">
                            {postData.comments.length}
                        </span>
                    </div>

                </div>

                {/* RIGHT - SAVE */}
                <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer 
                transition active:scale-90">
                    {isSaved ? (
                        <FaBookmark className="w-6 h-6 text-black" />
                    ) : (
                        <FaRegBookmark className="w-6 h-6 text-gray-700" />
                    )}
                </div>
            </div>

            {/* CAPTION */}
            {postData.caption && (
                <div className="px-4 pb-4 text-sm text-gray-800">
                    <span className="font-semibold mr-2">
                        {postData.author?.userName}
                    </span>
                    <span className="break-words">
                        {postData.caption}
                    </span>
                </div>
            )}

        </div>
    )
}

export default Post;

//10:13:44