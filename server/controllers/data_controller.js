module.exports = {
    getAllNotes: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const notes = await db.get_all_notes({user_id});
        res.status(200).send(notes)
    },
    addNote: async (req, res) => {
        const {user_id, title, content} = req.body
        const timestamp = Math.floor(Date.now() / 1000)
        const db = req.app.get('db')
        const note = await db.add_note({user_id, title, content, timestamp})
        res.status(200).send(note)
    },
    deleteNote: async (req, res) => {
        const db = req.app.get('db')
        const {note_id} = req.params
        await db.delete_note({note_id})
        res.status(200).send('note deleted')
    },
    updateNote: async (req, res) => {
        const {note_id, title, content} = req.body
        const timestamp = Math.floor(Date.now() / 1000)
        const db = req.app.get('db')
        const note = await db.update_note({note_id, title, content, timestamp})
        res.status(200).send(note)
    },
    getAllReminders: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const reminders = await db.get_all_reminders({user_id})
        console.log(reminders)
        res.status(200).send(reminders)
    },
    addReminder: async (req, res) => {
        const {user_id, title, remind_time, remind_date} = req.body
        const timestamp = Math.floor(Date.now() / 1000)
        const db = req.app.get('db')
        const reminder = await db.add_reminder({user_id, title, remind_time, remind_date, timestamp})
        res.status(200).send(reminder)
    },
    deleteReminder: async (req, res) => {
        const db = req.app.get('db')
        const {reminder_id} = req.params 
        await db.delete_reminder({reminder_id})
        res.status(200).send('reminder deleted')
    },
    updateReminder: async (req, res) => {
        const {reminder_id, title, content, remind_time, remind_date} = req.body
        const timestamp = Math.floor(Date.now() / 1000)
        const db = req.app.get('db')
        const reminder = await db.update_reminder({reminder_id, title, remind_time, remind_date, timestamp})
        res.status(200).send(reminder)
    },
    getAllTodos: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const todos = await db.get_all_todos({user_id})
        console.log(todos)
        res.status(200).send(todos)
    }
}
 