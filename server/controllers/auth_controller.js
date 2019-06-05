const bcrypt = require('bcryptjs')
module.exports = {
    register: async (req, res) => {
        const {username, first_name, last_name, password} = req.body 
        const db = req.app.get('db')
        const {session} = req
        const userFound = await  db.check_username({username})
        if (userFound[0]) return res.status(401).send('Username already exists')
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        const createdUser = await db.register_user({
            first_name,
            last_name,
            username,
            password: hash
        })
        session.user = {id: createdUser[0].user_id, username: createdUser[0].username}
        res.status(200).send(session.user)
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        console.log('req.body', req.body)
        const db = req.app.get('db')
        const {session} = req
        console.log(username)
        const userFound = await db.check_username({username})
        if (!userFound[0]) return res.status(401).send('Username not found')
        const authenticated = bcrypt.compareSync(password, userFound[0].password)
        if (authenticated) {
            session.user = {id: userFound[0].user_id, username}
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
        const {user} = req.session
        if (user) {
            const data = await db.get_user_data({ user_id: user.id })
            return res.status(200).send(data[0])
        }
        return res.status(401).send('Please Log In')
    }
}

