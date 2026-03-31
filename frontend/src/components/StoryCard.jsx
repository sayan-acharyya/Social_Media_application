import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

const StoryCard = () => {

    const { storyData } = useSelector(state => state.story);

    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {

                if (prev >= 100) {
                    clearInterval(interval);
                    navigate("/");
                    return 100;
                }


                return prev + 1
            });
            return () => clearInterval(interval)
        }, 150)
    }, [navigate])

    return (
        <div className=' w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 
    pt-[10px] relative flex flex-col justify-center '>


            {/* info */}
            <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px]'>
                <MdOutlineKeyboardBackspace
                    className='text-white cursor-pointer cursor-pointer w-[25px] h-[25px] '
                    onClick={() => navigate(-1)}
                />
                <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] 
                border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                    <img
                        src={storyData?.author?.profileImage || dp}
                        alt=""
                        className='w-full object-center'
                    />
                </div>

                <div className='w-[120px] font-semibold truncate text-white'>
                    {storyData?.author?.userName}
                </div>
            </div>

            {/* media */}
            <div className='w-full h-[90%] flex items-center justify-center text-white'>
                {storyData.mediaType === 'image' &&
                    <div className='w-[90%] flex items-center justify-center'>
                        <img
                            src={storyData?.media}
                            alt=""
                            className='w-[80%] rounded-2xl object-cover'
                        />
                    </div>}

                {storyData.mediaType === 'video' &&
                    <div className='w-[80%] flex flex-col items-center justify-center'>
                        <VideoPlayer media={storyData?.media} />
                    </div>}
            </div>




            {/* progress bar */}
            <div className='absolute  top-[10px]   w-full h-[5px] bg-gray-900'>
                <div
                    style={{ width: `${progress}%` }}
                    className='w-[200px] h-full bg-white transition-all 
                duration-200 ease-linear'>

                </div>
            </div>
        </div>
    )
}

export default StoryCard;





