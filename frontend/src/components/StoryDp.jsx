import React from 'react'
import dp from "../assets/dp.webp"
import { FaPlus } from "react-icons/fa";
import { BiPlusCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
const StoryDp = ({ profileImage, userName, story }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        if (!story && userName === "Your Story") {
            navigate("/upload");
        } else {

        }
    }


    return (
        <div

            className="flex flex-col items-center w-[75px]">

            <div
                onClick={handleClick}
                className={`p-[3px] rounded-full 
                ${story ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" : ""} relative`}>
                <div className="w-[75px] h-[75px] rounded-full overflow-hidden border-2 border-black ">
                    <img
                        src={profileImage || dp}
                        className="w-full h-full object-cover"
                        alt="profile"
                    />



                </div>
                {!story && userName === "Your Story" &&
                    <div>
                        <FaPlus
                            onClick={() => navigate("/upload")}
                            className='cursor-pointer    absolute right-1 top-14 text-xl bg-white text-black rounded-full p-1' />
                    </div>
                }
            </div>

            <div className="text-[14px] text-center truncate w-full text-white">
                {userName}
            </div>

        </div>
    )
}

export default StoryDp;

//2:17:55