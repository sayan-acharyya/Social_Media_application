import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userData: null,
        suggestedUsers: null,
        profileData: null
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
    }
})

export const { setUserData, setSuggestedusers, setProfileData } = userSlice.actions;
export default userSlice.reducer;