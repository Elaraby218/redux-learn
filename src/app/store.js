import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice"; // Import the default export

export const store = configureStore({
    reducer: {
        counter: counterReducer, 
    }
});