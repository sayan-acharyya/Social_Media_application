import React, { useEffect, useRef, useState } from 'react'
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoHeart, GoHeartFill, GoUnmute } from "react-icons/go";
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom';
import FollowButton from './FollowButton';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegComment } from 'react-icons/fa6';
import axios from 'axios';
import { serverUrl } from '../App';
import toast from 'react-hot-toast';
import { setPostData } from '../redux/slices/postSlice';
import { setLoopData } from '../redux/slices/loopSlice';
import { FaChevronDown } from "react-icons/fa6";

const LoopsCard = ({ loop, isMute, setIsMute }) => {
    const videoRef = useRef(null);
    const commentRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showComment, setShowComment] = useState(false);
    const [showHeart, setShowHeart] = useState(false);

    const navigate = useNavigate();
    const { userData } = useSelector(state => state.user);
    const { loopData } = useSelector(state => state.loop);

    const check = userData?._id === loop.author?._id;

    const isLiked = loop.likes.some(
        id => id.toString() === userData?._id
    );

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video) {
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(percent)
        }
    }

    // ▶ Play / Pause on click
    const handleClick = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
        } else {
            video.play();
            setIsPlaying(true);
        }
    };

    // 🔊 Sync mute with actual video DOM
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMute;
        }
    }, [isMute]);

    // 👀 Auto play/pause on scroll
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play();
                    setIsPlaying(true);
                } else {
                    video.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.6 }
        );

        observer.observe(video);

        return () => {
            observer.unobserve(video);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                commentRef.current &&
                !commentRef.current.contains(event.target)
            ) {
                setShowComment(false);
            }
        };

        if (showComment) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showComment]);

    const dispatch = useDispatch();

    const handleLike = async () => {
        try {
            const result = await axios.get(`${serverUrl}/loop/like/${loop._id}`,
                { withCredentials: true }
            );

            const updatedLoop = result.data.loop;

            const updatedLoops = loopData.map(l => l._id == loop?._id ? updatedLoop : l);
            dispatch(setLoopData(updatedLoops));
            toast.success(isLiked ? "You disliked the Reel 💔" : "You liked the Reel ❤️");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    const handleDoubleClick = async () => {
        setShowHeart(true);

        setTimeout(() => setShowHeart(false), 2000);
        { !isLiked ? handleLike() : null }
    }

    // const handleComment = async () => {
    //     try {
    //         const result = await axios.post(`${serverUrl}/post/comment/${post._id}`, { message },
    //             { withCredentials: true }
    //         );

    //         const updatedPost = result.data.post;

    //         const updatedPosts = postData.map(p => p._id == post?._id ? updatedPost : p);
    //         dispatch(setPostData(updatedPosts));
    //         toast.success("Comment added 💬");
    //         setShowComment(false);
    //         setMessage("");
    //     } catch (error) {
    //         toast.error(error.response?.data?.message);
    //     }
    // }

    return (
        <div


            className='
            w-full max-w-[480px] h-screen flex items-center justify-center mx-auto
            border-b-2 border-gray-800
            sm:border-l-2 sm:border-r-2 sm:border-b-0
            relative bg-black
        '

        >
            {/* show heart animattion */}
            {showHeart && (
                <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                    <GoHeartFill className='text-red-500 text-[90px] heart-animation drop-shadow-lg' />
                </div>
            )}

            {/* comment div */}
            {showComment &&
                <div
                    ref={commentRef}
                    className={`absolute z-[100] bottom-0 w-full h-[500px] 
            p-[10px]   rounded-t-4xl transition-transform duration-500 ease-in-out bg-[#0e1718] left-0 ${showComment ? "translate-y-0" : "translate-y-[-100%]"}`}>

                    {/* 🔽 Drag Handle */}
                    <div
                        onClick={() => setShowComment(false)}
                        className='flex justify-center py-2 cursor-pointer'
                    >
                        <div className='w-[40px] h-[4px] bg-gray-500 rounded-full'></div>
                    </div>

                    {/* Title */}
                    <h1 className='text-gray-200 text-[18px] text-center font-semibold mb-2'>
                        Comments
                    </h1>


                </div>}

            <video
                onDoubleClick={handleDoubleClick}
                src={loop?.media}
                ref={videoRef}
                loop
                autoPlay
                className='w-full max-h-full object-cover'
                onClick={handleClick}
                onTimeUpdate={handleTimeUpdate}
            />

            {/* 🔊 Mute / Unmute Button */}
            <div
                onClick={() => setIsMute(prev => !prev)}
                className='absolute top-[20px] right-[20px] z-[100] bg-black/50 p-2 rounded-full cursor-pointer'
            >
                {
                    isMute
                        ? <IoVolumeMuteOutline className='w-[20px] h-[20px] text-white' />
                        : <GoUnmute className='w-[20px] h-[20px] text-white' />
                }
            </div>
            {/* progress bar  */}
            <div className='absolute  bottom-0   w-full h-[5px] bg-gray-900'>
                <div
                    style={{ width: `${progress}%` }}
                    className='w-[200px] h-full bg-white transition-all 
                duration-200 ease-linear'>

                </div>
            </div>

            <div className='w-full absolute h-[100px] flex flex-col gap-[10px]  bottom-1'>
                <div className="flex items-center gap-3 cursor-pointer ml-4">

                    {/* Profile */}
                    <div
                        onClick={() => navigate(`/profile/${loop?.author?.userName}`)}
                        className="w-[40px] h-[40px] rounded-full overflow-hidden border">
                        <img
                            src={loop.author?.profileImage || dp}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info */}

                    <div className="flex gap-5 items-center leading-tight">
                        <span className="text-white  font-semibold text-[15px]">
                            {loop.author?.userName || "username"}
                        </span>
                        {!check && <FollowButton tailwind={'text-white border rounded-lg px-3 py-0.5 pb-1'} targetUserId={loop.author?._id} />}
                    </div>

                </div>
                <div className='text-sm text-gray-200 leading-snug max-w-[90%] px-[12px] '>
                    {loop?.caption}
                </div>

                <div className='  absolute right-0 flex flex-col gap-[20px] text-white bottom-[100px] justify-center px-[10px]   '>
                    {/* LIKE */}
                    <div
                        onClick={handleLike}
                        className="flex flex-col items-center gap-2 cursor-pointer group active:scale-90 transition"
                    >
                        {isLiked ? (
                            <GoHeartFill className="w-6 h-6 text-red-500 group-hover:scale-110 transition" />
                        ) : (
                            <GoHeart className="w-6 h-6 text-white   group-hover:scale-110 transition" />
                        )}
                        <span className="text-sm font-medium text-gray-100">
                            {loop.likes.length === 0 ? "Like" : loop.likes?.length}
                        </span>
                    </div>

                    {/* COMMENT */}
                    <div className="flex flex-col items-center gap-2 cursor-pointer group active:scale-90 transition">
                        <FaRegComment
                            onClick={() => setShowComment(true)}

                            className="w-6 h-6 text-white  transition"
                        />
                        <span className="text-sm font-medium text-gray-100">
                            {loop.comments.length}
                        </span>
                    </div>

                </div>




            </div>
        </div>
    )
}

export default LoopsCard;

//1:46:28