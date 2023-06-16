import { Schema, model, models } from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // owner details reference
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    // collaborators details reference
    collaborators: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    // songs details reference
    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Song",
        },
    ],
    public: {
        type: Boolean,
        required: true,
    },
});

export default models.Playlist || model("Playlist", playlistSchema);