import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setPostData } from '../redux/slices/postSlice';

const useGetAllPosts = () => {
    const dispatch = useDispatch(); 
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/post/getAll`,
                    { withCredentials: true }
                );

                dispatch(setPostData(res.data.posts)); // ✅ FIXED

            } catch (error) {
                console.log(error);
            }
        };

        fetchPost();
    }, [dispatch]);
};

export default useGetAllPosts;