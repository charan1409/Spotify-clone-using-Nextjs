import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./songSlice";
import queueReducer from "./queueSlice";

export const store = configureStore({
    reducer: {
        songReducer,
        queueReducer,
    },
});
