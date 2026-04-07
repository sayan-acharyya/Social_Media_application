import React from 'react'
import { useNavigate } from 'react-router-dom'
import dp from "../assets/dp.webp"
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../redux/slices/messageSlice';

const OnlineUser = ({ user }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='flex flex-col items-center relative w-[60px] flex-shrink-0 cursor-pointer'>

            {/* Profile Image */}
            <div
                onClick={() => {
                    dispatch(setSelectedUser(user))
                    navigate(`/messageArea`)
                }}
                className='w-[42px] h-[42px] rounded-full overflow-hidden'>
                <img
                    className='w-full h-full object-cover'
                    src={user?.profileImage || dp}
                    alt=""
                />
            </div>

            {/* Username */}
            <span className='text-white text-xs mt-1 truncate w-full text-center'>
                @{user?.userName}
            </span>

            {/* Online Dot */}
            <div className='w-[8px] h-[8px] bg-[#0080ff] rounded-full absolute top-1 right-2'></div>
        </div>
    )
}

export default OnlineUser