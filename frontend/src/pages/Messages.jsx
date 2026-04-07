import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import OnlineUser from '../components/onlineUser';
import { setSelectedUser } from '../redux/slices/messageSlice';
import dp from "../assets/dp.webp"

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.user);
  const { onlineUsers } = useSelector(state => state.socket);
  const { prevChatsUsers, selectedUser } = useSelector(state => state.message);

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

      {/* PREVIOUS CHATS */}
       <div className='w-full flex-1 overflow-y-auto flex flex-col gap-2 pr-1 no-scrollbar'>

  {prevChatsUsers?.map((user) => {

    const isOnline = onlineUsers?.includes(user._id);

    return (
      <div
        key={user._id}
        onClick={() => {
          dispatch(setSelectedUser(user))
          navigate(`/messageArea`)
        }}
        className={`w-full flex items-center gap-3 p-3 rounded-xl 
        hover:bg-[#121212] transition cursor-pointer
        ${selectedUser?._id === user._id ? "bg-[#1a1a1a]" : ""}`}
      >

        {/* Profile Image + Online Dot */}
        <div className='relative'>
          <div className='w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-700'>
            <img
              src={user?.profileImage || dp}
              alt=""
              className='w-full h-full object-cover'
            />
          </div>

          {/* 🔥 GREEN DOT (like Instagram) */}
          {isOnline && (
            <div className='absolute bottom-0 right-0 w-[12px] h-[12px] bg-green-500 rounded-full border-2 border-black'></div>
          )}
        </div>

        {/* User Info */}
        <div className='flex flex-col flex-1'>

          {/* Top Row */}
          <div className='flex justify-between items-center'>

            <span className='text-white font-semibold text-sm'>
              {user?.userName}
            </span>

            {/* 🔥 ACTIVE TEXT */}
            {isOnline && (
              <span className='text-green-400 text-[11px] font-medium'>
                Active now
              </span>
            )}

          </div>

          {/* Last Message Preview */}
          <span className='text-gray-400 text-xs truncate'>
            Tap to start chatting...
          </span>

        </div>

      </div>
    )
  })}

</div>
    </div>
  )
}

export default Messages;

//6:38:00