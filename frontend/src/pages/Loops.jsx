import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoopsCard from '../components/LoopsCard'

const Loops = () => {

    const navigate = useNavigate();
    const { loopData } = useSelector(state => state.loop)

    return (
        <div className='w-screen h-screen bg-black overflow-hidden flex flex-col items-center  '>
            <div className='w-full  flex items-center gap-4 py-4 px-4 top-[20px] pl-[30px]'>
                <MdOutlineKeyboardBackspace
                    onClick={() => navigate(-1)}
                    className='text-[26px] text-white cursor-pointer hover:scale-110 hover:text-gray-300 transition'
                />

                <h1 className='text-[25px] font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent'>
                    Loops
                </h1>
            </div>

            <div>
                {
                    loopData.map((loop, index) => (
                        <LoopsCard loop={loop} key={index} />
                    ))
                }
            </div>

        </div>
    )
}

export default Loops