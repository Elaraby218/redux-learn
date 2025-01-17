import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice"; // Import the default export
import postsReducer from "../features/posts/postSlice"
import usersReducer from "../features/users/usersSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer, 
        posts : postsReducer,
        users : usersReducer, 
    }
});