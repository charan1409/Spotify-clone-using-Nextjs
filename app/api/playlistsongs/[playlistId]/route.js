import { connectToDatabase } from "@/utils/database";
import Playlist from "@/models/playlist";

export const GET = async (req, { params }) => {
  const { playlistId } = params;
  try {
    await connectToDatabase();
    const playlist = await Playlist.findOne({ _id: playlistId }).populate(
        "songs"
    );
    return new Response(JSON.stringify(playlist), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("playlist not found", { status: 500 });
  }
};
