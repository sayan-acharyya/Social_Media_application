import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setLoopData } from '../redux/slices/loopSlice';
import { setFollowing } from '../redux/slices/userSlice';
 
const getFollowingList = () => {
    const dispatch = useDispatch(); 
    useEffect(() => {
        const fetchFollower = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/user/followingList`,
                    { withCredentials: true }
                );

                dispatch(setFollowing(res.data)); // ✅ FIXED

            } catch (error) {
                console.log(error);
            }
        };

        fetchFollower();
    }, [dispatch]);
};

export default getFollowingList;


 



//getFollowingList