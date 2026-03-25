import React, { useState } from 'react'
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from 'react-redux'
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6"
import { FiSend } from "react-icons/fi";
import axios from "axios"
import { serverUrl } from '../App';
import { setPostData } from '../redux/slices/postSlice';
import toast from 'react-hot-toast';

const Post = ({ post }) => {

    const { userData } = useSelector(state => state.user);
    const { postData } = useSelector(state => state.post);


    const check = userData?._id !== post.author?._id;

    const isLiked = post.likes.some(
        id => id.toString() === userData?._id
    );

    const isSaved = post.saved?.some(
        id => id.toString() === userData?._id
    );

    const dispatch = useDispatch();
    const [showComment, setShowComment] = useState(false);
    const [message, setMessage] = useState("");

    const handleLike = async () => {
        try {
            const result = await axios.get(`${serverUrl}/post/like/${post._id}`,
                { withCredentials: true }
            );

            const updatedPost = result.data.post;

            const updatedPosts = postData.map(p => p._id == post?._id ? updatedPost : p);
            dispatch(setPostData(updatedPosts));
            toast.success(isLiked ? "You disliked the post 💔" : "You liked the post ❤️");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }



    return (
        <div className='w-[90%] max-w-[500px] bg-white 
        flex flex-col rounded-2xl shadow-lg overflow-hidden'>

            {/* HEADER */}
            <div className='w-full flex justify-between items-center px-4 py-3'>

                <div className="flex items-center gap-3 cursor-pointer">

                    {/* Profile */}
                    <div className="w-[45px] h-[45px] rounded-full overflow-hidden border">
                        <img
                            src={post.author?.profileImage || dp}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col leading-tight">
                        <span className="text-gray-900 font-semibold text-sm">
                            {post.author?.userName || "username"}
                        </span>
                        <span className="text-gray-500 text-xs">
                            {post.author?.name || "name"}
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
                {post.mediaType === "image" && (
                    <img
                        src={post.media}
                        alt="post"
                        className="w-full max-h-[500px] object-cover"
                    />
                )}

                {post.mediaType === "video" && (
                    <video
                        src={post.media}
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
                    <div
                        onClick={handleLike}
                        className="flex items-center gap-2 cursor-pointer group active:scale-90 transition"
                    >
                        {isLiked ? (
                            <GoHeartFill className="w-6 h-6 text-red-500 group-hover:scale-110 transition" />
                        ) : (
                            <GoHeart className="w-6 h-6 text-gray-700 group-hover:text-red-500 group-hover:scale-110 transition" />
                        )}
                        <span className="text-sm font-medium text-gray-700">
                            {post.likes.length}
                        </span>
                    </div>

                    {/* COMMENT */}
                    <div className="flex items-center gap-2 cursor-pointer group active:scale-90 transition">
                        <FaRegComment
                            onClick={() => setShowComment(true)}
                            className="w-6 h-6 text-gray-700 group-hover:text-blue-500 group-hover:scale-110 transition"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            {post.comments.length}
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
            {post.caption && (
                <div className="px-4 pb-4 text-sm text-gray-800">
                    <span className="font-semibold mr-2">
                        {post.author?.userName}
                    </span>
                    <span className="break-words">
                        {post.caption}
                    </span>
                </div>
            )}

            {/* COMMENT BOX */}
            {
                showComment && (
                    <div className="w-full px-4 py-3 border-t flex items-center gap-3 bg-white">

                        <div className="w-[38px] h-[38px] rounded-full overflow-hidden border">
                            <img
                                src={userData?.profileImage || dp}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 bg-gray-100 px-4 py-2 rounded-full 
                            outline-none text-sm focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            className="p-2 rounded-full bg-blue-500 text-white 
                            hover:bg-blue-600 transition active:scale-90"
                        >
                            <FiSend className="w-5 h-5" />
                        </button>

                    </div>
                )
            }

        </div>
    )
}

export default Post;