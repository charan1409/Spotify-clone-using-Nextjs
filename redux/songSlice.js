import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name: "song",
    initialState: {
        songId: "",
        play: false
    },
    reducers: {
        currentSong: (state, action) => {
            state.songId = action.payload;
            state.play = true;
        },
        removeSong: (state) => {
            state.songId = "";
            state.play = false;
        },
        pauseSong: (state) => {
            state.play = false;
        },
        playSong: (state) => {
            state.play = true;
        }
    }
});

export const { currentSong, removeSong, pauseSong, playSong } = songSlice.actions;
export default songSlice.reducer;
