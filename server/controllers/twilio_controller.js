module.exports = {
    add: async (req, res) => {
        const msgFrom = req.body.From;
        const msgBody = req.body.Body
        const timestamp = Math.floor(Date.now() / 1000)
        const db = req.app.get('db')
        const response = await db.find_user_by_number({ msgFrom })
        if (response[0]) {
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
        res.status(404).send('Invalid phone number')
    }
}
