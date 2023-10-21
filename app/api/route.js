import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {

  return NextResponse.json(
    { message: "Hello World" },
    {
      status: 400,
    }
  );
}
