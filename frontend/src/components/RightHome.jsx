import React from 'react'

const RightHome = () => {
    return (
        <div className='w-[25%] min-h-[100vh] bg-black hidden lg:block relative'>

            {/* Gradient Left Border */}
            <div className='absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-yellow-500 via-pink-500 to-purple-600'></div>

        </div>
    )
}

export default RightHome   