import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook Error:", err.message);

    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("🎉 PAYMENT SUCCESS");
    console.log("Session ID:", session.id);
    console.log("Customer Email:", session.customer_email);
    console.log("Metadata:", session.metadata);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: session.metadata?.name || "",
          email: session.metadata?.email || session.customer_email || "",
          phone: session.metadata?.phone || "",
          tickets: session.metadata?.tickets || "",
          amount: session.amount_total / 100,
          paymentStatus: session.payment_status,
          sessionId: session.id,
        }),
      });

      const result = await response.text();

      console.log("✅ Google Script Status:", response.status);
      console.log("✅ Google Script Response:", result);

    } catch (error) {
      console.error("❌ Google Script Error:", error);
    }
  }

  return NextResponse.json({ received: true });
}