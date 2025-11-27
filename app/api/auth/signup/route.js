// app/api/auth/signup/route.js
import connectDB from "../../../lib/mongodb";
import User from "../../../lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  try {
    const { email, password, nickname } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      nickname,
      password: hashedPassword
    });

    return NextResponse.json({ id: newUser._id, email: newUser.email });
  } catch (err) {
    console.error("SIGNUP API ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
