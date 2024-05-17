import Stripe from 'stripe';
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const stripe = STRIPE_KEY
  ? new Stripe(STRIPE_KEY, {
      apiVersion: '2022-11-15',
    })
  : null;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [{ shipping_rate: 'shr_1Mci7vDyk1hPf5HZc91WfipW' }],
        line_items: req.body.products.map((p) => {
          const img = p.image[0].asset._ref;
          const newImage = img
            .replace(
              'image',
              'https://cdn.sanity.io/images/wxpns0n7/production/'
            )
            .replace('-webp', '.webp');
          return {
            price_data: {
              currency: 'USD',
              product_data: {
                name: p.name,
                images: [newImage],
              },
              unit_amount: p.price * 100,
            },
            quantity: p.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/failed`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe?.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
