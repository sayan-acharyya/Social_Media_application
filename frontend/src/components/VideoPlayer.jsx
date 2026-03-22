import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";
//<IoVolumeMuteOutline />  <GoUnmute />
const VideoPlayer = ({ media }) => {
    const videoTag = useRef();
    const [mute, setMute] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleClick = () => {
        if (isPlaying) {
            videoTag.current.pause();
            setIsPlaying(false);
        } else {
            videoTag.current.play();
            setIsPlaying(true);
        }
    }

    return (
        <div className='h-[100%] relative cursor-pointer
     max-w-full rounded-2xl overflow-hidden'>
            <video
                ref={videoTag}
                autoPlay
                loop
                muted={mute}
                src={media}
                className='h-[100%] cursor-pointer w-full 
                object-cover rounded-2xl'
                onClick={handleClick}
            />

            <div className='absolute bottom-[10px] right-[10px]'
                onClick={() => setMute(prev => !prev)}
            >
                {
                    !mute ? <GoUnmute
                        className='w-[20px] h-[20px] text-white font-semibold'
                    /> : <IoVolumeMuteOutline
                        className='w-[20px] h-[20px] text-white font-semibold'
                    />
                }
            </div>

        </div>
    )
}

export default VideoPlayer