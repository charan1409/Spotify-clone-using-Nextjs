import { connectToDatabase } from "@/utils/database";
import Playlist from "@/models/playlist";
import User from "@/models/user";

export const DELETE = async (req, { params }) => {
  const { userId, playlistId } = params;
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id: userId });
    const index = user.playlists.indexOf(playlistId);
    if (index > -1) {
      user.playlists.splice(index, 1);
    }
    await user.save();
    const playlist = await Playlist.findOneAndDelete({ _id: playlistId });
    return new Response(JSON.stringify(playlist), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("playlist not found", { status: 500 });
  }
};
