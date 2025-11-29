import connectDB from "../../../lib/mongodb"; // your mongoose connection
import User from "../../../lib/models/User"; // your User model
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  let connection;
  try {
    connection = await connectDB();
  } catch (err) {
    console.error("Database connection error:", err);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Optionally, remove password before sending back user info
    const userData = {
      id: user._id,
      email: user.email,
      nickname: user.nickname
    };

    return NextResponse.json(userData, { status: 200 });

  } catch (err) {
    console.error("LOGIN API ERROR:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
