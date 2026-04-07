import React from 'react'
import Messages from '../pages/Messages'

const RightHome = () => {
    return (
        <div className='w-[25%] h-screen bg-black hidden lg:block relative flex-shrink-0'>

            {/* Gradient Left Border */}
            <div className='absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-yellow-500 via-pink-500 to-purple-600'></div>

            <Messages />
        </div>
    )
}

export default RightHome