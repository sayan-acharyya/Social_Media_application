import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setStoryData } from '../redux/slices/storySlice';
import StoryCard from '../components/StoryCard';

const Story = () => {
    const { userName } = useParams();
    const dispatch = useDispatch();
    const { storyData } = useSelector(state => state.story);

    const [loading, setLoading] = useState(true);

    const handleStory = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/story/getByUserName/${userName}`,
                { withCredentials: true }
            );

            dispatch(setStoryData(result.data.story[0]));

            // ⏳ Force 1.5s loader delay
            setTimeout(() => {
                setLoading(false);
            }, 1000);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userName) {
            setLoading(true);
            handleStory();
        }
    }, [userName]);

    // 🔥 Loader UI
    if (loading) {
        return (
            <div className="w-full h-[100vh] bg-black flex flex-col justify-center items-center">

                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>

                {/* Optional subtle text */}
                <p className="text-gray-400 text-sm mt-4 tracking-wide">
                    Loading...
                </p>

            </div>
        );
    }

    return (
        <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
            <StoryCard />
        </div>
    );
}

export default Story;