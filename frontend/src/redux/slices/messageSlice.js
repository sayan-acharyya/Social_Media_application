import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice({
    name: "messageSlice",
    initialState: {
        selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
        messages: []
    },

    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
            localStorage.setItem("selectedUser", JSON.stringify(action.payload)); // ✅ save
        },
        setMessages: (state, action) => {
            if (typeof action.payload === "function") {
                state.messages = action.payload(state.messages);
            } else {
                state.messages = action.payload;
            }
        }
    }
})

export const { setSelectedUser, setMessages } = messageSlice.actions;
export default messageSlice.reducer;