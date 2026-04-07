import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import { setPrevChatUsers } from '../redux/slices/messageSlice';


const getPrevChatUsers = () => {
    const dispatch = useDispatch();
    const { messages } = useSelector(state => state.message);
    useEffect(() => {
        const fetchPrevChatUsers = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/message/prevChats`,
                    { withCredentials: true }
                );

                dispatch(setPrevChatUsers(res.data.previousUsers)); // ✅ FIXED

            } catch (error) {
                console.log(error);
            }
        };

        fetchPrevChatUsers();
    }, [messages]);
};

export default getPrevChatUsers;









//getPrevChatUsers