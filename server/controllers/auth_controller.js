const bcrypt = require('bcryptjs')
module.exports = {
    register: async (req, res) => {
        const { username, first_name, last_name, password } = req.body
        const db = req.app.get('db')
        const { session } = req
        const userFound = await db.check_username({ username })
        if (userFound[0]) return res.status(401).send('Username already exists')
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        const createdUser = await db.register_user({
            first_name,
            last_name,
            username,
            password: hash
        })
        session.user = { id: createdUser[0].user_id, username: createdUser[0].username }
        res.status(200).send(session.user)
    },
    updatePassword: async (req, res) => {
        const {username, password, passConfirm } = req.body;
        if (password === passConfirm) {
            const db = req.app.get('db')
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            db.update_password({ username, password: hash })
        }
        res.status(200).send('Password Updated')
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db')
        const { session } = req
        const userFound = await db.check_username({ username })
        if (!userFound[0]) return res.status(401).send('Username not found')
        const authenticated = bcrypt.compareSync(password, userFound[0].password)
        if (authenticated) {
            session.user = { id: userFound[0].user_id, username }
            res.status(200).send(session.user)
        } else {
            return res.status(401).send('Invalid Credentials')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUserData: async (req, res) => {
        const db = req.app.get('db')
        const { user } = req.session
        if (user) {
            const data = await db.get_user_data({ user_id: user.id })
            return res.status(200).send(data[0])
            console.log('data', data)
        }
        return res.status(401).send('Please Log In')
    },
    addPremium: async (req, res) => {
        const db = req.app.get('db')
        const { phone_number, user_id } = req.body

        const date = new Date()
        console.log('phone_number', phone_number)
        console.log('user_id', user_id)
        const customer = await db.get_user_data({ user_id })
        const premium_details = await db.get_premium_details({ user_id })
        let credits = premium_details.credits_used
        console.log('credits', credits)
        if (credits === undefined) credits = 0;
        console.log('credits2', credits)
        console.log('billing_date', date)
        if (customer.premium) {
            return res.status(401).send('Already a premium customer')
        }
        const premium = db.add_premium({ user_id, phone_number, billing_date: date, credits_used: credits })

        res.status(200).send(premium)
    },
    getPremiumDetails: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.params
        const premium_details = await db.get_premium_details({ user_id })
        res.status(200).send(premium_details)
    }
}

