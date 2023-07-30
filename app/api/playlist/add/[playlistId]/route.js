import { connectToDatabase } from "@/utils/database";
import Playlist from "@/models/playlist";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const { playlistId } = params;
  const { songId } = await req.json();
  try {
    await connectToDatabase();
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (playlist.songs.includes(songId)) {
      return new NextResponse("Song already exists in playlist", {
        status: 400,
      });
    }
    playlist.songs.push(songId);
    await playlist.save();
    return new NextResponse(JSON.stringify(playlist), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Playlist not found", { status: 500 });
  }
};
