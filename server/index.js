require('dotenv').config();
const http = require('http')
const express = require('express');
const massive = require('massive');
const session = require('express-session')
const bodyParser = require('body-parser')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const auth_ctrl = require('./controllers/auth_controller')
const data_ctrl = require('./controllers/data_controller')
const twil_ctrl = require('./controllers/twilio_controller')
const stripe_ctrl = require('./controllers/stripe_controller')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static( `${__dirname}/../build` ) );

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
app.get('/auth/all-details/:user_id', auth_ctrl.getAllDetails)
app.post('/auth/add-premium', auth_ctrl.addPremium)
app.put('/auth/update-password', auth_ctrl.updatePassword)


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
app.get('/todos/items/:todo_id', data_ctrl.getTodoItems)
app.post('/todos/add', data_ctrl.addTodo)
app.post('/todos/add-item', data_ctrl.addTodoItem)
app.delete('/todos/delete/:todo_id', data_ctrl.deleteTodo)
app.put('/todos/update', data_ctrl.updateTodo)

//twilio endpoints
app.post('/message', twil_ctrl.add)
app.post('/twilio/remind', twil_ctrl.remind)

app.post('/stripe/subscribe', stripe_ctrl.subscribe)



http.createServer(app).listen(SERVER_PORT, () => {
    console.log(`Express listening on port ${SERVER_PORT}`);
  });
  