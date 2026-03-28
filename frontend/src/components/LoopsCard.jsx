import React, { useRef } from 'react'

const LoopsCard = ({ loop }) => {
    const videoRef = useRef();
    return (
        <div className='
            w-full max-w-[480px] h-screen flex items-center justify-center mx-auto
            border-b-2 border-gray-800
            sm:border-l-2 sm:border-r-2 sm:border-b-0
            relative
        '>
            <video ref={videoRef} />
        </div>
    )
}

export default LoopsCard