import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Messages = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full min-h-[100vh] flex flex-col bg-black gap-[20px] p-[10px] '>
      {/* HEADER */}
      <div className='w-full max-w-[800px] flex items-center gap-4 py-4 px-4'>
        <MdOutlineKeyboardBackspace
          onClick={() => navigate(-1)}
          className='lg:hidden text-[28px] text-white cursor-pointer hover:scale-110 transition'
        />

        {/* Gradient Text */}
        <h1 className='text-[20px] font-semibold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent'>
          Messages
        </h1>
      </div>

    </div>
  )
}

export default Messages