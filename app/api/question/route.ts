import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.boilerexams.com/questions/d44531f1-3cf7-404d-bd10-e9a786484b8a"
  );

  const data = await res.json();
  return NextResponse.json(data);
}
