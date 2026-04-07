import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import OnlineUser from '../components/onlineUser';

const Messages = () => {
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.user);
  const { onlineUsers } = useSelector(state => state.socket);

  return (
    <div className='w-full h-full flex flex-col bg-black gap-[20px] p-[10px] overflow-hidden'>

      {/* HEADER */}
      <div className='w-full flex items-center gap-4 py-4 px-2'>
        <MdOutlineKeyboardBackspace
          onClick={() => navigate(-1)}
          className='lg:hidden text-[28px] text-white cursor-pointer hover:scale-110 transition'
        />

        <h1 className='text-[20px] font-semibold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent'>
          Messages
        </h1>
      </div>

      {/* ONLINE USERS */}
      <div className='w-full h-[90px] flex gap-[15px] items-center 
      overflow-x-auto no-scrollbar px-[10px] border-b border-gray-800'>

        {userData?.following?.map((user) => (
          onlineUsers?.includes(user._id) && (
            <OnlineUser key={user._id} user={user} />
          )
        ))}

      </div>
   
    </div>
  )
}

export default Messages