
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setSuggestedusers } from '../redux/slices/userSlice';


const getSuggestedusers = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);


    useEffect(() => {

        const fetchUser = async () => {
            try {

                const res = await axios.get(
                    `${serverUrl}/user/suggestedusers`,
                    { withCredentials: true }
                );

                dispatch(setSuggestedusers(res.data.users));

            } catch (error) {
                console.log(error);

            }
        };

        fetchUser();

    }, [userData]);
}

export default getSuggestedusers;