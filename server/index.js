require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env
const auth_ctrl = require('./controllers/auth_controller')
const data_ctrl = require('./controllers/data_controller')
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
//authorization endpoints
app.post('/auth/login', auth_ctrl.login)
app.post('/auth/register', auth_ctrl.register)
app.get('/auth/logout', auth_ctrl.logout)
app.get('/auth/getUserData', auth_ctrl.getUserData)

//note endpoints
app.post('/notes/add', data_ctrl.addNote)
app.get('/notes/all/:user_id', data_ctrl.getAllNotes)
app.put('/notes/update', data_ctrl.updateNote)
app.delete('/notes/delete/:note_id', data_ctrl.deleteNote)

//reminder endpoints
app.post('/reminders/add', data_ctrl.addReminder)
app.get('/reminders/all/:user_id', data_ctrl.getAllReminders)
app.put('/reminders/update', data_ctrl.updateReminder)
app.delete('/reminders/delete/:reminder_id', data_ctrl.deleteReminder)

//todo endpoints
app.get('/todos/all/:user_id', data_ctrl.getAllTodos)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))