import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { userId } = params;
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id: userId }).populate("playlists");
    return new NextResponse(JSON.stringify(user.playlists), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Playlists not found", { status: 500 });
  }
};
