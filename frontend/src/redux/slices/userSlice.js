import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userData: null,
        suggestedUsers: null,
        profileData: null,
        following: [],
        searchData: []
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
        toggleFollow: (state, action) => {
            const targetUserId = action.payload;
            if (state.following.includes(targetUserId)) {
                state.following = state.following.filter(id => id !== targetUserId)
            } else {
                state.following.push(targetUserId);
            }

        },
    }

})



export const { setUserData, setFollowing, toggleFollow, setSuggestedusers, setProfileData, setSearchData } = userSlice.actions;
export default userSlice.reducer;