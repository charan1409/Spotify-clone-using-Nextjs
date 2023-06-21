import { Schema, model, models } from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    collaborators: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Song",
        },
    ],
    public: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
});

export default models.Playlist || model("Playlist", playlistSchema);