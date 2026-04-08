import React, { useEffect, useState } from 'react'
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
import { setUserData } from '../redux/slices/userSlice';
import useGetAllPosts from '../hooks/getAllPosts';
import FollowButton from './FollowButton';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {

    const { userData } = useSelector(state => state.user);
    const { postData } = useSelector(state => state.post);
    const { socket } = useSelector(state => state.socket);


    const check = userData?._id !== post.author?._id;

    const isLiked = post.likes.some(
        id => id.toString() === userData?._id
    );

    const isSaved = userData?.saved?.some(
        item => (item._id || item).toString() === post._id.toString()
    );

    const dispatch = useDispatch();
    const [showComment, setShowComment] = useState(false);
    const [message, setMessage] = useState("");
    const [openAllComments, setOpenAllComments] = useState(false);

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

    const handleComment = async () => {
        try {
            const result = await axios.post(`${serverUrl}/post/comment/${post._id}`, { message },
                { withCredentials: true }
            );

            const updatedPost = result.data.post;

            const updatedPosts = postData.map(p => p._id == post?._id ? updatedPost : p);
            dispatch(setPostData(updatedPosts));
            toast.success("Comment added 💬");
            setShowComment(false);
            setMessage("");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    const handleSave = async () => {
        try {
            const result = await axios.get(`${serverUrl}/post/saved/${post._id}`,
                { withCredentials: true }
            );

            dispatch(setUserData(result.data.user))

            toast.success(result.data.message);

        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    const navigate = useNavigate();

    const formatTime = (time) => {
        const now = new Date();
        const past = new Date(time);
        const diff = Math.floor((now - past) / 1000);

        if (diff < 60) return "just now";
        if (diff < 3600) return Math.floor(diff / 60) + " min ago";
        if (diff < 86400) return Math.floor(diff / 3600) + " hr ago";
        if (diff < 604800) return Math.floor(diff / 86400) + " days ago";

        return past.toLocaleDateString(); // fallback
    };
     
    useEffect(() => {
        socket?.on("likedPost", (updatedData) => {
            const updatedPosts = postData.map(p => p._id == updatedData.postId ?
                { ...p, likes: updatedData.likes } : p
            )
            dispatch(setPostData(updatedPosts))
        })

        socket?.on("commentedPost", (updatedData) => {
            const updatedPosts = postData.map(p => p._id == updatedData.postId ?
                { ...p, comments: updatedData.comments } : p
            )
            dispatch(setPostData(updatedPosts))
        })

        return () => {
            socket?.off("likedPost")
            socket?.off("commentedPost")
        }
    }, [socket, postData, dispatch])

    return (
        <div className='w-[90%] max-w-[500px] bg-white 
        flex flex-col rounded-2xl shadow-lg overflow-hidden text-black'>

            {/* HEADER */}
            <div className='w-full flex justify-between items-center px-4 py-3'>

                <div className="flex items-center gap-3 cursor-pointer">

                    {/* Profile */}
                    <div
                        onClick={() => navigate(`/profile/${post?.author?.userName}`)}
                        className="w-[45px] h-[45px] rounded-full overflow-hidden border">
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


                    <FollowButton
                        targetUserId={post?.author?._id}
                        tailwind="px-4 py-1.5 text-sm font-semibold 
                    bg-blue-500 text-white rounded-full hover:bg-blue-600 
                    transition"
                    />
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
                            onClick={() => setShowComment(!showComment)}
                            className="w-6 h-6 text-gray-700 group-hover:text-blue-500 group-hover:scale-110 transition"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            {post.comments.length}
                        </span>
                    </div>

                </div>

                {/* RIGHT - SAVE */}
                <div
                    onClick={handleSave}
                    className="p-2 rounded-full hover:bg-gray-100 cursor-pointer 
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
                            onClick={handleComment}
                            className="p-2 rounded-full bg-blue-500 text-white 
                            hover:bg-blue-600 transition active:scale-90"
                        >
                            <FiSend className="w-5 h-5" />
                        </button>

                    </div>
                )
            }
            {/* Preview Comments (only 2) */}
            <div className='w-full px-4 pb-2 flex flex-col gap-2'>

                {
                    post.comments?.slice(0, 2).map((comment, index) => (
                        <div
                            onClick={() => navigate(`/profile/${comment?.author?.userName}`)}
                            key={index} className="flex items-start gap-2">

                            <img

                                src={comment.author?.profileImage || dp}
                                className="w-[28px] h-[28px] rounded-full object-cover"
                            />

                            <p className="text-sm">
                                <span className="font-semibold mr-1">
                                    {comment.author?.userName}
                                </span>
                                {comment.message}
                            </p>

                        </div>
                    ))
                }

                {/* View All Comments */}
                {
                    post.comments?.length > 2 && (
                        <button
                            onClick={() => setOpenAllComments(true)}
                            className="text-gray-500 text-sm text-left hover:underline"
                        >
                            View all  comments
                        </button>
                    )
                }

            </div>

            {openAllComments && (
                <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md bg-black/40 p-4">
                    <div className="w-full max-w-[500px] h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-xl text-gray-800">Comments</h2>
                            <button
                                onClick={() => setOpenAllComments(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <span className="text-2xl leading-none">×</span>
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4 flex flex-col gap-6 custom-scrollbar">
                            {post.comments?.length > 0 ? (
                                post.comments.map((comment, index) => (
                                    <div key={index} className="flex gap-3 items-start group">
                                        {/* Profile Image */}
                                        <img
                                            onClick={() => navigate(`/profile/${comment?.author?.userName}`)}
                                            src={comment.author?.profileImage || dp}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover border border-gray-100 cursor-pointer hover:opacity-90 transition"
                                        />

                                        <div className="flex flex-col flex-1 gap-1">
                                            {/* User Info Bar */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="text-sm font-bold text-gray-900 cursor-pointer hover:underline"
                                                        onClick={() => navigate(`/profile/${comment?.author?.userName}`)}
                                                    >
                                                        {comment.author?.userName}
                                                    </span>
                                                    <span className="text-[11px] font-medium text-gray-500  tracking-tighter">
                                                        {formatTime(comment.createdAt)}
                                                    </span>
                                                </div>

                                                {comment.author?._id !== userData?._id && (
                                                    <FollowButton
                                                        targetUserId={comment.author?._id}
                                                        tailwind="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                                                    />
                                                )}
                                            </div>

                                            {/* Comment Content */}
                                            <div className="text-sm text-gray-700 leading-snug bg-gray-200 rounded-2xl rounded-tl-none p-3 border border-gray-100 inline-block self-start max-w-[90%]">
                                                {comment.message}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 italic">
                                    No comments yet. Be the first!
                                </div>
                            )}
                        </div>

                        {/* Optional: Add a comment input footer here for better UX */}
                    </div>
                </div>
            )}

        </div>
    )
}

export default Post;

