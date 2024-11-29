import { NextResponse } from "next/server";
;
import { db } from "@/db/index";
import { carts } from "@/db/schema/carts";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Empty the cart for the user
    await db
      .update(carts)
      .set({ items: [], updatedAt: new Date() })
      .where(eq(carts.userId, userId));

    return NextResponse.json({
      success: true,
      message: "Cart emptied successfully",
    });
  } catch (error) {
    console.error("Error emptying cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
