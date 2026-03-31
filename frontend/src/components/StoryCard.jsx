import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

const StoryCard = () => {

    const { storyData } = useSelector(state => state.story);
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const story = storyData?.[index];

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
        <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 
        pt-[10px] relative flex flex-col justify-center bg-black'>

            {/* INFO */}
            <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px]'>

                <MdOutlineKeyboardBackspace
                    className='text-white cursor-pointer w-[25px] h-[25px]'
                    onClick={() => navigate(-1)}
                />

                <div className='w-[35px] h-[35px] rounded-full overflow-hidden'>
                    <img
                        src={story?.author?.profileImage || dp}
                        className='w-full h-full object-cover'
                    />
                </div>

                <div className='text-white font-semibold'>
                    {story?.author?.userName}
                </div>
            </div>

            {/* MEDIA */}
            <div className='w-full h-[90%] flex items-center justify-center'>

                {story?.mediaType === 'image' && (
                    <img
                        src={story?.media}
                        className='w-[80%] rounded-2xl object-cover'
                    />
                )}

                {story?.mediaType === 'video' && (
                    <div className='w-[80%]'>
                        <VideoPlayer media={story?.media} />
                    </div>
                )}

            </div>

            {/* PROGRESS BAR */}
            <div className='absolute top-[10px] w-full h-[4px] bg-gray-800'>
                <div
                    style={{ width: `${progress}%` }}
                    className='h-full bg-white transition-all duration-150'
                />
            </div>

        </div>
    )
}

export default StoryCard;