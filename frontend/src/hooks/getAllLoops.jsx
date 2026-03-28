import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setLoopData } from '../redux/slices/loopSlice';
 
const getAllLoops = () => {
    const dispatch = useDispatch(); 
    useEffect(() => {
        const fetchLoop = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/loop/getAll`,
                    { withCredentials: true }
                );

                dispatch(setLoopData(res.data.loops)); // ✅ FIXED

            } catch (error) {
                console.log(error);
            }
        };

        fetchLoop();
    }, [dispatch]);
};

export default getAllLoops;


 