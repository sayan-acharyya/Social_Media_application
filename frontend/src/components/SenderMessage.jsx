import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import dp from "../assets/dp.webp"

const SenderMessage = ({ message }) => {
  const { userData } = useSelector(state => state.user);
  const { messages } = useSelector(state => state.message);
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message.message, message.image]);



  return (
    <div
      ref={scroll}
      className='flex flex-col items-end w-full'>

      {/* MESSAGE BUBBLE */}
      <div className='max-w-[75%] bg-gradient-to-tr from-[#9500ff] to-[#ff0095] 
        text-white rounded-2xl rounded-br-sm px-3 py-2 shadow-md'>

        {/* IMAGE */}
        {message?.image && (
          <img
            className='w-full max-h-[220px] object-cover rounded-xl mb-2'
            src={message?.image}
            alt=""
          />
        )}

        {/* TEXT */}
        {message?.message && (
          <p className='text-[14px] leading-[18px] break-words'>
            {message.message}
          </p>
        )}

        {/* TIME (optional if you have createdAt) */}
        {message?.createdAt && (
          <span className='text-[10px] text-white/70 mt-1 block text-right'>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>
        )}
      </div>

      {/* PROFILE IMAGE */}
      <div className='w-[30px] h-[30px] rounded-full overflow-hidden mt-1'>
        <img
          className='w-full h-full object-cover'
          src={userData?.profileImage || dp}
          alt=""
        />
      </div>

    </div>
  )
}

export default SenderMessage;