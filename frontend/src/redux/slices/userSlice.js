import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userData: null,
        suggestedUsers: null,
        profileData: null,
        following: [],
        searchData: [],
        notificationData: []
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setSuggestedusers: (state, action) => {
            state.suggestedUsers = action.payload;
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        setFollowing: (state, action) => {
            state.following = action.payload;
        },
        setSearchData: (state, action) => {
            state.searchData = action.payload;
        },
        setNotificationData: (state, action) => {
            state.notificationData = action.payload;
        },
        toggleFollow: (state, action) => {
            const targetUserId = action.payload;
            if (state.following.includes(targetUserId)) {
                state.following = state.following.filter(id => id !== targetUserId)
            } else {
                state.following.push(targetUserId);
            }

        },
        markAsReadLocal: (state, action) => {
            const id = action.payload;
            const notification = state.notificationData.find(n => n._id === id);
            if (notification) {
                notification.isRead = true;
            }
        },
        deleteNotificationLocal: (state, action) => {
            const id = action.payload;
            state.notificationData = state.notificationData.filter(
                n => n._id !== id
            );
        }
    }

})



export const { setUserData, markAsReadLocal, deleteNotificationLocal, setFollowing, toggleFollow, setSuggestedusers, setProfileData, setSearchData, setNotificationData } = userSlice.actions;
export default userSlice.reducer;