import React from 'react'

const StoryCard = () => {
    return (
        <div >
            <div className='ml-2 w-[60px] h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                <img
                    className='w-full h-full object-cover'
                    src={userData?.profileImage || dp}
                    alt=""
                />
            </div>
        </div>
    )
}

export default StoryCard