import { PopulatedCartItem } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  console.log(process.env.STRIPE_SECRET_KEY as string);
  try {
    const body = await req.json();
    const { items, email } = await body;
    const extractedItem = items.map((item: PopulatedCartItem) => ({
      quantity: item.quantity,
      price_data: {
        currency: "pkr",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
        },
      },
    }));
    const origin = req.headers.get("origin");
    // console.log(stripe.checkout.sessions)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractedItem,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?canceled=true`,
      customer_email: email,
      metadata: {
        email,
      },
    });
    // console.log(session)
    // console.log(items, email);
    return NextResponse.json(
      { url: session?.url },

      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error },
      {
        status: 500,
      }
    );
  }
}
