require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order');

const createSession = async (req, res) => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({ message: 'Falta STRIPE_SECRET_KEY en variables de entorno' });
        }

        const { products, orderId } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'products es obligatorio y debe tener al menos 1 item' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: products.map(p => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: p.name
                    },
                    unit_amount: p.price * 100
                },
                quantity: p.quantity
            })),
            mode: 'payment',
            client_reference_id: orderId, // ponemos el orderId para despues poder hacer el update en el webhook
            success_url: 'http://localhost:5173/checkout/success',
            cancel_url: 'http://localhost:5173/checkout/cancel'
        });

        return res.status(200).json({
            session_id: session.id,
            session_url: session.url
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear la sesión de checkout',
            error: error.message
        });
    }
};

const webhook = async (req, res) => {
    try {
        const signature = req.headers['stripe-signature'];
        // Para poder usarlo en local usar siguiente comando: stripe listen --forward-to localhost:3000/api/checkout/webhook
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!signature || !webhookSecret) {
            return res.status(400).send('Falta stripe-signature o STRIPE_WEBHOOK_SECRET');
        }

        const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);

        console.log('Evento de Stripe:', event.type);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const orderId = session.client_reference_id;
            console.log('orderId extraído de client_reference_id:', orderId);

            if (orderId) {
                const updated = await Order.findByIdAndUpdate(orderId, { estado: 'paid' });
                console.log('Pedido actualizado');
            } else {
                console.warn('No se encontró client_reference_id — el pedido no se puede actualizar');
            }
        }

        return res.status(200).json({ received: true });
    } catch (error) {
        console.error('Webhook Error:', error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
};

module.exports = {
    createSession,
    webhook
};