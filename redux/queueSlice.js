import { createSlice } from "@reduxjs/toolkit";

export const queueSlice = createSlice({
  name: "queue",
  initialState: {
    queue: [],
  },
  reducers: {
    addSong: (state, action) => {
        state.queue = [...state.queue, ...action.payload];
    },
    removeSong: (state, action) => {
      state.queue.splice(action.payload, 1);
    },
    clearQueue: (state) => {
      state.queue = [];
    },
    moveSongToTop: (state, action) => {
      const songId = action.payload;
      const songIndex = state.queue.indexOf(songId);
      state.queue.splice(songIndex, 1);
      state.queue.unshift(songId);
    },
    // shuffle the queue
    shuffleQueue: (state) => {
      const shuffledQueue = state.queue.sort(() => Math.random() - 0.5);
      state.queue = shuffledQueue;
    }
  },
});

export const { addSong, removeSong, clearQueue, moveSongToTop, shuffleQueue } =
  queueSlice.actions;
export default queueSlice.reducer;
