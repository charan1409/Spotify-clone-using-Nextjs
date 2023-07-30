import { connectToDatabase } from "@/utils/database";
import Song from "@/models/song";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDatabase();
    const songs = await Song.find({});
    return new NextResponse(JSON.stringify(songs), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Songs not found", { status: 500 });
  }
};
