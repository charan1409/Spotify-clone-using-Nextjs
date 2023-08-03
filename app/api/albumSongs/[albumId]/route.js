import { connectToDatabase } from "@/utils/database";
import Song from "@/models/song";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { albumId } = params;
  try {
    await connectToDatabase();
    const songs = await Song.find({ album: albumId });
    return new NextResponse(JSON.stringify(songs), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Songs not found", { status: 500 });
  }
};
