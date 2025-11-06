import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";

// Define type for your JWT payload
interface JWTPayload {
  id: string;
  email: string;
}

// Define type for User model (simplified)
interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password }: { email?: string; password?: string } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email } as JWTPayload,
      secret,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        token,
        user: { id: user._id, name: user.name, email: user.email },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
