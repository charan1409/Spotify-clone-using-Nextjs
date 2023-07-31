import { createSlice } from "@reduxjs/toolkit";

export const queueSlice = createSlice({
    name: "queue",
    initialState: {
        songId: "",
    },
    reducers: {
        currentSong: (state, action) => {
            state.songId = action.payload;
        },
    }
});

export const { currentSong } = queueSlice.actions;
export default queueSlice.reducer;
