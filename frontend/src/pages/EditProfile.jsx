import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {

    const navigate = useNavigate();
    const { profileData, userData } = useSelector(state => state.user);

    return (
        <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]'>

            {/* HEADER */}
            <div className='w-full max-w-[800px] flex items-center gap-4 py-4 px-4 text-white'>

                {/* BACK BUTTON */}
                <MdOutlineKeyboardBackspace 
                    onClick={() => navigate(-1)}
                    className='text-[28px] cursor-pointer hover:scale-110 transition'
                />

                {/* TITLE */}
                <h1 className='text-[20px] font-semibold'>Edit Profile</h1>
            </div>
 
        </div>
    )
}
//6:50:57
export default EditProfile