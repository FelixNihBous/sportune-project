// app/api/auth/signup/route.js
import connectDB from "../../../lib/mongodb";
import User from "../../../lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  let connection;
  try {
    connection = await connectDB();
  } catch (err) {
    console.error("Database connection error:", err);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }

  try {
    const { email, password, nickname } = await req.json();

    if (!email || !password || !nickname) {
      return NextResponse.json({ error: "Email, password, and nickname are required" }, { status: 400 });
    }

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

    return NextResponse.json({ id: newUser._id, email: newUser.email, nickname: newUser.nickname });
  } catch (err) {
    console.error("SIGNUP API ERROR:", err);
    if (err.name === 'ValidationError') {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
