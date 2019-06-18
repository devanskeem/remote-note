require('dotenv').config();
const { STRIPE_SECRET } = process.env
const stripe = require('stripe')(STRIPE_SECRET)
module.exports = {
    subscribe: async (req, res) => {
        const { stripeToken, user_id, phone_number } = req.body
        console.log('req.body', req.body)
        const db = req.app.get('db')
        const customer = await stripe.customers.create({
            email,
            source: stripeToken,
        });
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{plan: 'plan_FGv7mg4ScNbHQk'}],
          })
        
        const userData = await db.get_user_data({ user_id })
        const premium_details = await db.get_premium_details({ user_id })
        let credits = premium_details.credits_used
        if (credits === undefined) credits = 0;
        if (userData.premium) {
            return res.status(401).send('Already a premium customer')
        }
        const premium = db.add_premium({ user_id, phone_number, credits_used: credits })

        res.status(200).send(premium)

    }
}