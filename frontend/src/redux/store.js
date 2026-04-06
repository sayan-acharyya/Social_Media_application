import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice.js"
import postSlice from "./slices/postSlice.js"
import loopSlice from "./slices/loopSlice.js"
import storySlice from "./slices/storySlice.js"
import messageSlice from "./slices/messageSlice.js"
import socketSlice from "./slices/socketSlice.js";

export const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice,
        loop: loopSlice,
        story: storySlice,
        message: messageSlice,
        socket: socketSlice
    }
})