import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
  
});

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(req) {
  try {
    const { name, email, phone, tickets } = await req.json();

    // Validate ticket quantity
    if (!tickets || tickets < 1 || tickets > 20) {
      return Response.json(
        { error: "Invalid number of tickets." },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: `Navratri Garba 2026 (${tickets} Ticket${
                tickets > 1 ? "s" : ""
              })`,
            },

            unit_amount: 1000, // $10.00
          },

          quantity: tickets,
        },
      ],

      customer_email: email,

      metadata: {
        name,
        email,
        phone,
        tickets: tickets.toString(),
      },

      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(
        email
      )}`,

      cancel_url: `${baseUrl}/cancel`,
    });

    return Response.json({
      url: session.url,
    });

  } catch (err) {
    console.error("Stripe Error:", err);

    return Response.json(
      { error: err.message || "Something went wrong." },
      { status: 500 }
    );
  }
}