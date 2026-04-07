import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setSuggestedusers } from '../redux/slices/userSlice';

const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    useEffect(() => {

        if (!userData) return; // 🔥 WAIT until user loads

        const fetchUsers = async () => {
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

        fetchUsers();

    }, [userData]); // ✅ now valid
}

export default useGetSuggestedUsers;