import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name: "song",
    initialState: {
        songId: "",
    },
    reducers: {
        currentSong: (state, action) => {
            state.songId = action.payload;
        },
        removeSong: (state) => {
            state.songId = "";
        }
    }
});

export const { currentSong, removeSong } = songSlice.actions;
export default songSlice.reducer;
