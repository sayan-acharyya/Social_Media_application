import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { serverUrl } from '../App';
import { setProfileData, toggleFollow, setUserData } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';
import getAllStories from '../hooks/getAllStories';
import getCurrentUser from '../hooks/getCurrentUser';

const FollowButton = ({ targetUserId, tailwind }) => {
    const dispatch = useDispatch();
    const { userData, following, profileData } = useSelector(state => state.user);

    // ✅ your same logic
    const isFollowing = following?.some(
        (user) => user._id === targetUserId
    );

    // ✅ local state for instant text update
    const [followState, setFollowState] = useState(isFollowing);

    // ✅ sync with redux value
    useEffect(() => {
        setFollowState(isFollowing);
    }, [isFollowing]);

    const handleFollow = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/user/follow/${targetUserId}`,
                { withCredentials: true }
            );

            // ✅ your same logic
            dispatch(toggleFollow(targetUserId));
            dispatch(setUserData(result.data.user));
            dispatch(setProfileData(result.data.profileUser));

            // ✅ instant UI update
            setFollowState(prev => !prev);

            // ✅ your same logic
            let updatedFollowers;

            const isFollowing = following.includes(targetUserId);

            if (isFollowing) {
                updatedFollowers = profileData.followers.filter(
                    id => id.toString() !== userData._id.toString()
                );
            } else {
                updatedFollowers = [...profileData.followers, userData._id];
            }

            dispatch(setProfileData({
                ...profileData,
                followers: updatedFollowers
            }));

            toast.success(result.data.message );

            // 🔥 reload after toast
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
             
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    return (
        <button
            onClick={handleFollow}
            className={tailwind}>
            {followState ? "Unfollow" : "Follow"}
        </button>
    )
}

export default FollowButton;