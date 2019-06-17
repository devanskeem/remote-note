require('dotenv').config();
const {STRIPE_SECRET} = process.env
const stripe = require('stripe')(STRIPE_SECRET)
module.exports = {
    subscribe: async (req, res) => {
        const {stripeToken, email, user_id, phone_number} = req.body
        const db = req.app.get('db')

        console.log('stripeToken', stripeToken)
        console.log('email', email)
        const customerData = await stripe.customers.create({
            email,
            source: stripeToken
        }, (err, customer) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'error'
                })
            } else{
                const {id} = customer

                const subscriptionData = stripe.subscription.create({
                    customer: id,
                    items: [{plan: 'prod_FFrYlHMzxzXB4H'}]
                }, (err, subscription) => {
                    if (err) {
                        res.send({
                            success: false,
                            message: 'error'
                        })
                    }
                })
            }
        })
        const date = new Date()
        const customer = await db.get_user_data({ user_id })
        const premium_details = await db.get_premium_details({ user_id })
        let credits = premium_details.credits_used
        if (credits === undefined) credits = 0;
        if (customer.premium) {
            return res.status(401).send('Already a premium customer')
        }
        const premium = db.add_premium({ user_id, phone_number, billing_date: date, credits_used: credits })

        res.status(200).send(premium)

    }
}