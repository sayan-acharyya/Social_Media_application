import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const StoryCard = ({ storyData }) => {


    const [index, setIndex] = useState(0);
    const [showViewers, setShowViewers] = useState(false);

    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const story = storyData?.[index];
    const { userData } = useSelector(state => state.user);


    const dummyUsers = [
        "https://i.pravatar.cc/100?img=1",
        "https://i.pravatar.cc/100?img=2",
        "https://i.pravatar.cc/100?img=3",
        "https://i.pravatar.cc/100?img=4",
    ];


    // ✅ AUTO NEXT STORY
    useEffect(() => {
        if (!story) return;

        const interval = setInterval(() => {
            setProgress(prev => {

                if (prev >= 100) {
                    clearInterval(interval);

                    // move to next story
                    if (index < storyData.length - 1) {
                        setIndex(prev => prev + 1);
                        return 0;
                    } else {
                        navigate("/");
                        return 100;
                    }
                }

                return prev + 1;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [index, storyData, navigate]);

    if (!story) return null;


    return (
        <div className="w-full max-w-[500px] h-screen relative bg-black overflow-hidden">

            {/* 🔝 PROGRESS BAR */}
            <div className="absolute top-2 left-0 w-full px-2 z-50">
                <div className="w-full h-[3px] bg-gray-700 rounded-full overflow-hidden">
                    <div
                        style={{ width: `${progress}%` }}
                        className="h-full bg-white transition-all duration-150"
                    />
                </div>
            </div>

            {/* 🔝 HEADER */}
            {!showViewers && (
                <div className="absolute top-5 left-0 w-full flex items-center justify-between px-3 z-50">

                    <div className="flex items-center gap-2">
                        <MdOutlineKeyboardBackspace
                            className="text-white w-6 h-6 cursor-pointer"
                            onClick={() => navigate(-1)}
                        />

                        <img
                            src={story?.author?.profileImage || dp}
                            className="w-9 h-9 rounded-full object-cover"
                        />

                        <span className="text-white text-sm font-semibold">
                            {story?.author?.userName}
                        </span>
                    </div>

                </div>
            )}

            {/* 🔽 MAIN STORY */}
            {!showViewers && (
                <>
                    <div className="w-full h-full relative flex items-center justify-center">

                        {/* MEDIA */}
                        {story?.mediaType === "image" && (
                            <img
                                src={story?.media}
                                className="w-full h-full object-cover"
                            />
                        )}

                        {story?.mediaType === "video" && (
                            <VideoPlayer media={story?.media} />
                        )}

                        {/* TOP GRADIENT */}
                        <div className="absolute top-0 w-full h-[120px] bg-gradient-to-b from-black/70 to-transparent" />

                        {/* BOTTOM GRADIENT */}
                        <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-black/80 to-transparent" />

                        {/* 👇 TAP AREAS (NEXT / PREV) */}
                        <div className="absolute inset-0 flex">
                            <div
                                className="w-1/2"
                                onClick={() => index > 0 && setIndex(index - 1)}
                            />
                            <div
                                className="w-1/2"
                                onClick={() => {
                                    if (index < storyData.length - 1) {
                                        setIndex(index + 1);
                                        setProgress(0);
                                    } else {
                                        navigate("/");
                                    }
                                }}
                            />
                        </div>

                    </div>

                    {/* 👁 VIEWERS BAR */}
                    {story?.author?.userName === userData?.userName && (
                        <div
                            className="absolute bottom-4 left-0 w-full px-4 z-50 cursor-pointer"
                            onClick={() => setShowViewers(true)}
                        >

                            <div className="flex items-center justify-between text-white">

                                <div className="flex items-center gap-3">

                                    {/* avatars */}
                                    <div className="flex -space-x-2">
                                        {dummyUsers.slice(0, 3).map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                            />
                                        ))}
                                    </div>

                                    {/* count */}
                                    <div className="flex items-center gap-1 text-sm">
                                        <MdOutlineRemoveRedEye />
                                        <span>{story?.viewers?.length}</span>
                                    </div>

                                </div>

                                <span className="text-xs text-gray-300">
                                    Swipe up
                                </span>

                            </div>
                        </div>
                    )}
                </>
            )}

            {/* 🔽 VIEWERS SCREEN */}
            {showViewers && (
                <div className="absolute inset-0 bg-black z-50 flex flex-col">

                    {/* TOP PREVIEW */}
                    <div className="mt-12 mb-3 flex justify-center">
                        <div className="w-[70%] h-[160px] rounded-xl overflow-hidden">
                            {story?.mediaType === "image" ? (
                                <img src={story?.media} className="w-full h-full object-cover" />
                            ) : (
                                <VideoPlayer media={story?.media} />
                            )}
                        </div>
                    </div>

                    {/* PANEL */}
                    <div className="flex-1 bg-[#0f0f0f] rounded-t-3xl px-4 pt-3 flex flex-col">

                        {/* HANDLE */}
                        <div className="w-10 h-1 bg-gray-600 rounded-full mx-auto mb-3" />

                        {/* HEADER */}
                        <div className="flex items-center justify-between text-white mb-2">
                            <div className="flex items-center gap-2">
                                <MdOutlineRemoveRedEye />
                                <span className="text-sm font-semibold">
                                    {story?.viewers?.length} viewers
                                </span>
                            </div>

                            <IoMdClose
                                className="text-xl cursor-pointer text-gray-400"
                                onClick={() => setShowViewers(false)}
                            />
                        </div>

                        <div className="h-[1px] bg-gray-800 mb-2" />

                        {/* LIST */}
                        <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar">

                            {story?.viewers.map((viewer, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition"
                                >

                                    <div className="flex items-center gap-3">
                                        <img
                                            onClick={() => navigate(`/profile/${viewer?.userName}`)}
                                            src={viewer?.profileImage || dp}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <span className="text-white text-sm font-medium">
                                            {viewer?.userName}
                                        </span>
                                    </div>

                                    <span className="text-xs text-gray-400">
                                        Seen
                                    </span>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default StoryCard;


//3:46:51