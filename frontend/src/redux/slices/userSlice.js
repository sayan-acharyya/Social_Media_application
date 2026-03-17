import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userData: null,
        suggestedUsers: null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setSuggestedusers: (state, action) => {
            state.suggestedUsers = action.payload;
        },
    }
})

export const { setUserData,setSuggestedusers } = userSlice.actions;
export default userSlice.reducer;