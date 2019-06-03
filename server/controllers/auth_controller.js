const bcrypt = require('bcryptjs')
module.exports = {
    register: async (req, res) => {
        const {username, first_name, last_name, password} = req.body 
        const db = req.app.get('db')
        const {session} = req
        const userFound = await  db.check_username({username})
        if (userFound[0]) return res.status(409).send('Username already exists')
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
        const db = req.app.get('db')
        const {session} = req
        const userFound = await db.check_username({username})
        if (!userFound[0]) return res.status(402).send('Username not found')
        const authenticated = bcrypt.compareSync(password, userFound[0].password)
        if (authenticated) {
            session.user = {id: userFound[0].user_id, username}
            res.status(200).send(session.user)
        } else {
            return res.status(401).send('Invalid Credentials')
        }
    }
    // getAll: async (req, res) => {
    //     const db = req.app.get('db')
    //     const allData = db.getAllData(req.session.user.id)
    //     res.status(200).send(allData)
    // }
}