import { connectToDatabase } from "@/utils/database";
import Playlist from "@/models/playlist";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { playlistName, playlistDescription, playlistImage, userId } =
    await req.json();
  try {
    await connectToDatabase();
    const playlist = await Playlist.create({
      name: playlistName,
      description: playlistDescription,
      image: playlistImage,
      owner: userId,
      songs: [],
    });
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { playlists: playlist._id } }
    );
    return new NextResponse("Playlist created", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Playlist not created", { status: 500 });
  }
};
