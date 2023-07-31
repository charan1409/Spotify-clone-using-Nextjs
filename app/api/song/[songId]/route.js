import { connectToDatabase } from "@/utils/database";
import Song from "@/models/song";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { songId } = params;
    try{
        await connectToDatabase();
        const song = await Song.findOne({ _id: songId });
        return new Response(JSON.stringify(song), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("song not found", { status: 500 });
    }
}
