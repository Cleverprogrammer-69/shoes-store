import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { orders } from "@/db/schema/orders";
import { auth } from "@/auth";
import { PopulatedCartItem } from "@/types/types";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      populatedCart,
      email,
      id: sessionId,
      totalAmount,
    } = await req.json();

    if (!populatedCart || !email || !sessionId || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderItems = populatedCart.map((item: PopulatedCartItem) => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
    }));

    const newOrder = await db
      .insert(orders)
      .values({
        userId: session.user.id,
        sessionId,
        items: orderItems,
        totalAmount,
        status: "completed",
      })
      .returning();

    return NextResponse.json({ success: true, order: newOrder[0] });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
