import axios from 'axios';
import React, { useEffect } from 'react'
import { setFollowing, setUserData } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setCurrentUserStory } from '../redux/slices/storySlice';

const getCurrentUser = () => {
    const dispatch = useDispatch();

    const { storyData } = useSelector(state => state.story);

    useEffect(() => {

        const fetchUser = async () => {
            try {

                const res = await axios.get(
                    `${serverUrl}/user/current`,
                    { withCredentials: true }
                );

                dispatch(setUserData(res.data.user));
                dispatch(setFollowing(res.data.user.following));
                 
            } catch (error) {
                console.log(error);

            }
        };

        fetchUser();

    }, [storyData]);
}

export default getCurrentUser