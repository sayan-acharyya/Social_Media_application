import React from 'react'
import OtherUsers from './OtherUsers'
import { FiHeart } from 'react-icons/fi'
import logo from "../assets/image4.png";

const Feed = () => {
    return (
        <div className='lg:w-[50%] w-full bg-black min-h-[100vh] 
    lg:h-[100vh] relative lg:overflow-y-auto'>
        
            {/* logo and heart  icon for small devices */}
            <div className='w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden'>
                <img
                    className='w-[100px]'
                    src={logo}
                    alt=""
                />

                <FiHeart className='text-pink-500 w-[25px] h-[25px]' />
            </div>


        </div>
    )
}

export default Feed