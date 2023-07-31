import { configureStore } from "@reduxjs/toolkit";
import queueReducer from "./queueSlice";

export const store = configureStore({
    reducer: {
        queueReducer,
    },
});
