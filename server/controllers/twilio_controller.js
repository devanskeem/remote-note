require('dotenv').config();
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
    add: async (req, res) => {
        const msgFrom = req.body.From;
        const msgBody = req.body.Body
        const timestamp = Math.floor(Date.now() / 1000)
        const db = req.app.get('db')
        const response = await db.find_user_by_number({ msgFrom })
        let credits_used = response[0].credits_used
        db.update_credits({credits_used: ++credits_used, user_id: response[0].user_id})
        if (response[0].credits_used < 250) {
            const user_id = response[0].user_id
            db.add_note({ user_id, title: 'Note', content: msgBody, timestamp })
            return res.status(200).send(`
                <Response>
                    <Message>
                        "${msgBody}" added as a note.
                    </Message>
                </Response>
            `);
        }
        res.status(404).send('No credits left')
    },
    remind: async (req, res) => {
        const db = req.app.get('db')
        const { title, user_id, remind_unix } = req.body;
        const premium_details = await db.get_premium_details({ user_id })
        const millisecondsToReminder = remind_unix - new Date()
        setTimeout(() => {
            client.messages
            .create({
                body: `Reminder: \n ${title}`,
                from: '+16127126683',
                to: premium_details[0].phone_number
            })
        }, millisecondsToReminder)
        
    }
}
