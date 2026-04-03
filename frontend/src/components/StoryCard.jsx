import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";

const StoryCard = () => {
  const { storyData } = useSelector(state => state.story);
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const dummyUsers = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4",
  ];

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
        border-black rounded-full cursor-pointer overflow-hidden'
          onClick={() => navigate(`/profile/${storyData?.author?.userName}`)}
        >
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

      {/* view story */}
      {storyData?.author?.userName === userData?.userName && (

        <div className="absolute bottom-0 left-0 w-full px-4 pb-4">

          <div className="flex justify-between items-center 
    bg-white/10 backdrop-blur-md border border-white/10 
    rounded-2xl px-4 py-3">

            {/* 👁 Viewers */}
            <div className="flex items-center gap-2 text-white">
              <span className="text-lg text-white"><MdOutlineRemoveRedEye /></span>
              <span className="text-sm font-medium">
                {storyData?.viewers?.length || 0}
              </span>
              <span className="text-xs text-gray-300">views</span>
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
            </div>

            {/* ⬆ Swipe Up */}
            <div className="flex items-center gap-1 text-white/80 text-sm cursor-pointer hover:text-white transition">
              <span className="text-sm animate-bounce "><FaArrowUp /></span>
              <span>Swipe up</span>
            </div>

          </div>

        </div>
      )}
    </div>
  )
}

export default StoryCard;


//3:22:00