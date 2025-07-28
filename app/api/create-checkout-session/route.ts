// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(request: NextRequest) {
//     try {
//         const { amount } = await request.json();
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amount,
//             currency: 'usd',
//             automatic_payment_methods: {
//                 enabled: true,
//             },
//         });

//         return NextResponse.json({ clientSecret: paymentIntent.client_secret });
//     } catch (error: any) {
//         console.error("Error creating payment intent:", error);
//         return NextResponse.json(
//             { error: error.message || "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }


import Stripe from "stripe";
import { NextResponse } from "next/server";
// import home from "page.tsx";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-06-30.basil",
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-Shirt",
            },
            unit_amount: 49 * 100, // $20 (in cents)
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
