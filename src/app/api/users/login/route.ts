import connectDB from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json({ message: "User does not exist", status: 400 });
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password);

		if (!isPasswordValid) {
			return NextResponse.json(
				{ message: "Check your credentials" },
				{ status: 400 }
			);
		}

		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});

		const response = NextResponse.json({
			message: "Logged in successfully",
			success: true,
		});

		response.cookies.set("token", token, {
			httpOnly: true,
			secure: true,
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
