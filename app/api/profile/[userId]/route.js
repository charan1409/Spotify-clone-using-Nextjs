import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, { params }) => {
  const { userId } = params;
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id: userId });
    const data = {
        username: user.name,
        profilePhoto: user.image,
        userId: user._id,
        following: user.following,

    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("user not found", { status: 500 });
  }
};

export const POST = async (req) => {
  const { username, profilePhoto, userId } = await req.json();
  try {
    await connectToDatabase();
    User.findOneAndUpdate(
      { _id: userId },
      { username: username, profilePhoto: profilePhoto }
    ).then((user) => {
      console.log(user);
    });
    return new Response("Profile updated", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("profile not updated", { status: 500 });
  }
};
