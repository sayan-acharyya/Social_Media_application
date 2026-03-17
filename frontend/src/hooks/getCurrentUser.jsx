import axios from 'axios';
import React, { useEffect } from 'react'
import { setUserData } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { serverUrl } from '../App';

const getCurrentUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchUser = async () => {
            try {

                const res = await axios.get(
                    `${serverUrl}/user/current`,
                    { withCredentials: true }
                );

                dispatch(setUserData(res.data.user));

            } catch (error) {
                console.log(error);

            }
        };

        fetchUser();

    }, []);
}

export default getCurrentUser