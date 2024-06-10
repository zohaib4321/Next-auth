import connectDB from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
	const userId = await getDataFromToken(request);
	const user = await User.findOne({ _id: userId }).select("-password");

	return NextResponse.json({
		message: "User founded",
		data: user,
	});
}
