require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env
const auth_ctrl = require('./controllers/auth_controller')
const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        max_age: 60 * 60 * 1000
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('database set')
})
app.post('/auth/login', auth_ctrl.login)
app.post('/auth/register', auth_ctrl.register)
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))