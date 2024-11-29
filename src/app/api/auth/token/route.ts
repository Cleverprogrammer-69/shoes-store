import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authjs.session-token");

  return NextResponse.json({ token: token?.value });
}
