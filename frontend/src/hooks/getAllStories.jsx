import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setStoryData, setStoryList } from '../redux/slices/storySlice';


const getAllStories = () => {
    const dispatch = useDispatch();
    const { storyData } = useSelector(state => state.story)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/story/getAll`,
                    { withCredentials: true }
                );

                dispatch(setStoryList(res.data.stories)); // ✅ FIXED

            } catch (error) {
                console.log(error);
            }
        };

        fetchPost();
    }, [dispatch,storyData]);
};

export default getAllStories;


