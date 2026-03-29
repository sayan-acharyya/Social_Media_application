import React, { useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoopsCard from '../components/LoopsCard'

const Loops = () => {

    const navigate = useNavigate();
    const { loopData } = useSelector(state => state.loop)
    const [isMute, setIsMute] = useState(true);

    return (
         <div className='w-screen h-screen bg-black overflow-hidden relative'>

    {/* 🔙 HEADER (floating, NOT full width) */}
    <div className='absolute top-0 left-0 w-full flex justify-center z-50 pointer-events-none'>
        
        <div className='
            w-full max-w-[480px]
            flex items-center justify-between
            px-4 py-3 text-white
            pointer-events-auto
        '>
            {/* Back */}
            <div
                onClick={() => window.history.back()}
                className='cursor-pointer text-xl'
            >
                <MdOutlineKeyboardBackspace/>
            </div>

            {/* Title */}
            <div className='text-lg font-semibold'>
                Loops
            </div>

            {/* Spacer */}
            <div className='w-[20px]' />
        </div>

    </div>


    {/* 🎥 FULL WIDTH REELS */}
    <div className='h-full overflow-y-scroll no-scrollbar snap-y snap-mandatory'>
        {
            loopData.map((loop, index) => (
                <div className='h-screen snap-start' key={index}>
                    <LoopsCard
                        loop={loop}
                        isMute={isMute}
                        setIsMute={setIsMute}
                    />
                </div>
            ))
        }
    </div>

</div>
    )
}

export default Loops