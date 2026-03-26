import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { serverUrl } from '../App';
import { setProfileData, toggleFollow } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';

const FollowButton = ({ targetUserId, tailwind }) => {
    const dispatch = useDispatch();
    const { userData, following, profileData } = useSelector(state => state.user);

    const isFollowing = following.includes(targetUserId)

    const handleFollow = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/user/follow/${targetUserId}`,
                { withCredentials: true }
            );

            // ✅ update following
            dispatch(toggleFollow(targetUserId));

            // ✅ update profile followers count instantly
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

            toast.success(result.data.message);

        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <button
            onClick={handleFollow}
            className={tailwind}>
            {isFollowing ? "Unfollow" : " Follow"}
        </button>
    )
}

export default FollowButton