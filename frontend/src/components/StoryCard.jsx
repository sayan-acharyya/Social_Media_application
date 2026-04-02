import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux';
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
        return prev + 1;
      })
    }, 150);
    return () => clearInterval(interval);
  }, [navigate]);



  return (
    <div className='w-full  max-w-[500px] h-[100vh] border-x-2 border-gray-800 
    pt-[10px] relative flex flex-col justify-center'>
      <div className='flex items-center gap-[10px] absolute top-[25px] '>
        <MdOutlineKeyboardBackspace className='text-white ml-2 cursor-pointer w-[25px] h-[25px] '
          onClick={() => navigate(-1)}
        />
        <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2
        border-black rounded-full cursor-pointer overflow-hidden'>
          <img
            src={storyData?.author?.profileImage || dp}
            alt=""
            className='w-full object-cover'
          />
        </div>
        <div className='w-[120px] font-semibold truncate text-white'>
          {storyData?.author?.userName}
        </div>
      </div>

      {/* media */}

      <div className="w-full   bg-black">
        {storyData.mediaType === "image" && (
          <img
            src={storyData.media}
            alt="post"
            className="w-full max-h-[500px] object-cover"
          />
        )}

        {storyData.mediaType === "video" && (

          <VideoPlayer media={storyData.media} />
        )}
      </div>


      {/* progress bar  */}
      <div className='absolute  top-2   w-full h-[5px] bg-gray-900'>
        <div
          style={{ width: `${progress}%` }}
          className='w-[200px] h-full bg-white transition-all 
                duration-200 ease-linear'>

        </div>
      </div>


    </div>
  )
}

export default StoryCard