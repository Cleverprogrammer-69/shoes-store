import { auth } from "@/auth";
import { db } from "@/db/index";
import { carts, CartItem } from "@/db/schema/carts";
import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userCart = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, session.user.id))
      .limit(1);

    console.log("UserCart in backend: ", userCart);

    if (userCart.length === 0) {
      return NextResponse.json({ items: [] });
    }
    console.log(userCart[0])

    return NextResponse.json(userCart[0]);
  } catch (error) {
    console.error("Error in GET /api/cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const userCart = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, session.user.id))
      .limit(1);

    if (userCart.length > 0) {
      const currentItems = userCart[0].items as CartItem[];
      const existingItemIndex = currentItems.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex > -1) {
        currentItems[existingItemIndex].quantity += 1;
      } else {
        currentItems.push({ productId, quantity: 1 });
      }

      await db
        .update(carts)
        .set({ items: currentItems, updatedAt: new Date() })
        .where(eq(carts.id, userCart[0].id));
    } else {
      await db.insert(carts).values({
        userId: session.user.id,
        items: [{ productId, quantity: 1 }],
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    if (!productId || typeof quantity !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const userCart = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, session.user.id))
      .limit(1);

    if (userCart.length === 0) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const currentItems = userCart[0].items as CartItem[];
    const itemIndex = currentItems.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex > -1) {
      if (quantity > 0) {
        currentItems[itemIndex].quantity = quantity;
      } else {
        currentItems.splice(itemIndex, 1);
      }

      await db
        .update(carts)
        .set({ items: currentItems, updatedAt: new Date() })
        .where(eq(carts.id, userCart[0].id));

      console.log(userCart[0].items)
      return NextResponse.json({
        success: true,
        updatedCart: userCart[0],
      });
    } else {
      return NextResponse.json(
        { error: "Product not found in cart" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in PATCH /api/cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    console.log("Session in delete: ", session)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    console.log("Delete: ", productId)
    if (!productId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const userCart = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, session.user.id))
      .limit(1);

    if (userCart.length === 0) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const currentItems = userCart[0].items as CartItem[];
    console.log("currentItems",currentItems)
    const updatedItems = currentItems.filter(
      (item) => item.productId !== productId
    );
    console.log("Updated itmems: ",updatedItems)

    await db
      .update(carts)
      .set({ items: updatedItems, updatedAt: new Date() })
      .where(eq(carts.id, userCart[0].id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
