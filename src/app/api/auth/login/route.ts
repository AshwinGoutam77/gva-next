import { cookieName,signJwt,comparePassword } from "@/lib/auth";
import { connectDB } from '@/app/lib/db';
import { NextResponse } from "next/server";

import User from '@/app/models/User'; 
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email & Password required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

  const token = signJwt({
  _id: user._id.toString(),
  role: user.role,
  organizationId: user.organizationId ? user.organizationId.toString() : null,
});

    const response = NextResponse.json({
      message: "Login successful",
      role: user.role,
    });

    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
