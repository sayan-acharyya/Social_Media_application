import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.webp"
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';

const StoryDp = ({ profileImage, userName, story }) => {

    const navigate = useNavigate();
    const { userData } = useSelector(state => state.user);
    const { storyData, storyList } = useSelector(state => state.story);
    const [viewed, setViewed] = useState(false);

   console.log(userData);
   
    const handleViewer = async () => {
        try {
            const result = await axios.get(`${serverUrl}/story/view/${story._id}`,
                { withCredentials: true }
            );

        } catch (error) {
            console.log(error);

        }

    }
    const handleClick = async () => {
        if (!story && userName === "Your Story") {
            navigate("/upload");
        } else {
            await handleViewer();
            setViewed(true); // ✅ instant UI update

            if (userName === "Your Story") {
                navigate(`/story/${userData?.userName}`);
            } else {
                navigate(`/story/${userName}`);
            }
        }
    };

    const isViewed =
        viewed ||
        story?.viewers?.some(
            viewer => viewer === userData?._id || viewer?._id === userData?._id
        );
    console.log(isViewed);

    return (
        <div

            className="flex flex-col items-center w-[75px]">

            <div
                onClick={handleClick}
                className={`p-[3px] rounded-full relative ${story
                        ? isViewed
                            ? "bg-gray-500"   // ✅ viewed
                            : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" // ❌ not viewed
                        : ""
                    }`}

            >
                <div className="w-[75px] h-[75px] rounded-full overflow-hidden border-2 border-black relative">
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
                            className='absolute w-[18px] h-[18px] bg-white rounded-full right-1 top-14 p-0.5' />
                    </div>}

            </div>

            <div className="text-[14px] text-center truncate w-full text-white">
                {userName}
            </div>

        </div>
    )
}

export default StoryDp;





