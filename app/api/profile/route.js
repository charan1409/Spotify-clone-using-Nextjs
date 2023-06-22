import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  const { username, profilePic, userId } = await req.json();
  try {
    await connectToDatabase();
    await User.findOneAndUpdate(
      { _id: userId },
      { name: username, image: profilePic }
    );
    return new NextResponse("user updated", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("User not found", { status: 500 });
  }
};
