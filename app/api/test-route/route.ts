import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI as string;
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    return NextResponse.json({ status: "Connected successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Connection failed: ${error.message}` },
      { status: 500 }
    );
  }
}