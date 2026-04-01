import React from 'react'
import dp from "../assets/dp.webp"
import { FaPlus } from "react-icons/fa";
 
const StoryDp = ({ profileImage, userName, story }) => {
 
 
    return (
        <div

            className="flex flex-col items-center w-[75px]">

            <div
               
                className={`p-[3px] rounded-full  bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 relative`}>
                <div className="w-[75px] h-[75px] rounded-full overflow-hidden border-2 border-black ">
                    <img
                        src={profileImage || dp}
                        className="w-full h-full object-cover"
                        alt="profile"
                    />



                </div>
                 
            </div>

            <div className="text-[14px] text-center truncate w-full text-white">
                {userName}
            </div>

        </div>
    )
}

export default StoryDp;

