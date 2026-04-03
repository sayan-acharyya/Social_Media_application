import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux';
import { MdOutlineKeyboardBackspace, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import { FaArrowUp } from "react-icons/fa6";

const StoryCard = () => {
  const { storyData } = useSelector(state => state.story);
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showViewer, setShowViewer] = useState(false);

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
    <div className='w-full max-w-[500px] h-[100vh] mx-auto bg-black relative overflow-hidden'>

      {/* progress */}
      <div className='absolute top-2 left-2 right-2 h-[4px] bg-white/20 rounded-full z-20'>
        <div
          style={{ width: `${progress}%` }}
          className='h-full bg-white rounded-full transition-all duration-200'
        />
      </div>

      {/* header */}
      <div className='absolute top-5 left-3 right-3 flex items-center justify-between z-20'>

        <div className='flex items-center gap-3'>
          <MdOutlineKeyboardBackspace
            className='text-white cursor-pointer w-6 h-6'
            onClick={() => navigate(-1)}
          />

          <div
            onClick={() => navigate(`/profile/${storyData?.author?.userName}`)}
            className='w-9 h-9 rounded-full overflow-hidden border border-white/30'
          >
            <img src={storyData?.author?.profileImage || dp} className='w-full h-full object-cover' />
          </div>

          <span className='text-white text-sm font-semibold'>
            {storyData?.author?.userName}
          </span>
        </div>

      </div>

      {/* MAIN CONTENT */}
      {!showViewer && (
        <>
          {/* media */}
          <div className="w-full h-full flex items-center justify-center">
            {storyData?.mediaType === "image" && (
              <img
                src={storyData?.media}
                className="w-full h-full object-cover"
              />
            )}

            {storyData?.mediaType === "video" && (
              <VideoPlayer media={storyData?.media} />
            )}
          </div>

          {/* bottom bar */}
          {storyData?.author?.userName === userData?.userName && (
            <div className="absolute bottom-4 left-3 right-3 z-20">

              <div className="flex justify-between items-center bg-black/40 backdrop-blur-lg px-4 py-3 rounded-full border border-white/10">

                {/* views */}
                <div className="flex items-center gap-2 text-white text-sm">
                  <MdOutlineRemoveRedEye />
                  <span>{storyData?.viewers?.length || 0}</span>

                  <div className="flex -space-x-2 ml-2">
                    {dummyUsers.slice(0, 3).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-6 h-6 rounded-full border border-black"
                      />
                    ))}
                  </div>
                </div>

                {/* swipe */}
                <div
                  onClick={() => setShowViewer(true)}
                  className="flex items-center gap-1 text-white/70 text-xs cursor-pointer"
                >
                  <FaArrowUp className="animate-bounce" />
                  Swipe up
                </div>

              </div>

            </div>
          )}
        </>
      )}

      {/* VIEWERS PANEL */}
      {showViewer && (
        <div className="absolute bottom-0 left-0 w-full h-full bg-black/95 z-30 flex flex-col transition-all duration-300">

          {/* drag handle */}
          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mt-2 mb-3"></div>

          {/* top mini story */}
          <div className="w-full h-[30%] px-4">
            {storyData?.mediaType === "image" && (
              <img
                src={storyData?.media}
                className="w-full h-full object-cover rounded-xl"
              />
            )}

            {storyData?.mediaType === "video" && (
              <VideoPlayer media={storyData?.media} />
            )}
          </div>

          {/* viewers list */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-4 mt-4">
            <div className="flex items-center gap-2 text-white mb-4">
              <MdOutlineRemoveRedEye />
              <span className="font-semibold">
                {storyData?.viewers?.length || 0} Views
              </span>
            </div>

            <div className="space-y-3">
              {storyData.viewers.map((viewer, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img 
                  onClick={()=>navigate(`/profile/${viewer?.userName}`)}
                  src={viewer?.profileImage || dp} className="w-10 h-10 rounded-full cursor-pointer" />
                  <span className="text-white text-sm">{viewer?.userName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* close */}
          <div
            onClick={() => setShowViewer(false)}
            className="text-center text-white py-4 border-t border-gray-800 cursor-pointer"
          >
            Close
          </div>

        </div>
      )}

    
    </div>
  )
}

export default StoryCard;