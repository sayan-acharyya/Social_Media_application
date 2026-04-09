import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setNotificationData } from '../redux/slices/userSlice';
import { useEffect } from 'react';


const getAllNotification = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);
    
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/user/getAllNotifications`,
                    { withCredentials: true }
                );

                dispatch(setNotificationData(res.data.notifications))

            } catch (error) {
                console.log(error);
            }
        };
        fetchNotifications();
    }, [dispatch, userData])


}

export default getAllNotification;



//getAllNotification