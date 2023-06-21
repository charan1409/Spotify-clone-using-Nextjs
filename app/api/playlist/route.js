import { connectToDatabase } from "@/utils/database";
import Playlist from "@/models/playlist";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  return new NextResponse("server is on", { status: 200 });
};

export const POST = async (req) => {
  const {playlistName, playlistDescription, playlistImage, userId} = await req.json();
  try {
    await connectToDatabase();
    await Playlist.create({
      name: playlistName,
      description: playlistDescription,
      image: playlistImage,
      owner: userId,
    });
    return new NextResponse("Playlist created", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Playlist not created", { status: 500 });
  }
};
