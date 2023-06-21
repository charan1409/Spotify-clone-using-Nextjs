import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  playlists: [
    {
      type: Schema.Types.ObjectId,
      ref: "Playlist",
    },
  ],
  likedSongs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  recentlyPlayed: {
    song: {
      type: Schema.Types.ObjectId,
      ref: "Song"
    },
    shuffle: {
      type: Boolean,
      default: false
    },
    playedTime: {
      type: Number,
      default: 0
    }
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "Playlist",
    },
  ],
  queue: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

export default models.User || model("User", userSchema);
