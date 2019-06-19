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
        res.status(200).send(reminders)
    },
    addReminder: async (req, res) => {
        const {user_id, title, remind_unix, remind_date, remind_time} = req.body
        const timestamp = Math.floor(Date.now() / 1000)
        const db = req.app.get('db')
        const reminder = await db.add_reminder({user_id, title, remind_unix, timestamp, remind_date, remind_time})
        res.status(200).send(reminder)
    },
    deleteReminder: async (req, res) => {
        const db = req.app.get('db')
        const {reminder_id} = req.params 
        await db.delete_reminder({reminder_id})
        res.status(200).send('reminder deleted')
    },
    updateReminder: async (req, res) => {
        const {reminder_id, title, remind_unix, remind_date, remind_time} = req.body
        const timestamp = Math.floor(Date.now() / 1000)
        const db = req.app.get('db')
        const reminder = await db.update_reminder({reminder_id, title, remind_unix, remind_date, remind_time, timestamp})
        res.status(200).send(reminder)
    },
    getAllTodos: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const todos = await db.get_all_todos({user_id})
        res.status(200).send(todos)
    },
    getTodoItems: async (req, res) => {
        const db = req.app.get('db')
        const {todo_id} = req.params
        const items = await db.get_todo_items({todo_id})
        res.status(200).send(items)
    },
    addTodo: async (req, res) => {
        const {title, user_id, items} = req.body
        const timestamp = Math.floor(Date.now() / 1000)
        const db = req.app.get('db')
        const todo = await db.add_todo({title, user_id, items, timestamp})
        res.status(200).send(todo)
    },
    addTodoItem: async (req, res) => {
        const db = req.app.get('db')
        const {content, todo_id} = req.body
        const todoItem = await db.add_todo(content, todo_id)
        res.status(200).send(todoItem)
    },
    deleteTodo: async (req, res) => {
        const db = req.app.get('db')
        const {todo_id} = req.params 
        await db.delete_todo({todo_id})
        res.status(200).send('todo deleted')
    },
    updateTodo: async (req, res) => {
        const db = req.app.get('db')
        const timestamp = Math.floor(Date.now() / 1000)
        const {todo_id, title, items} = req.body
        const updated = await db.update_todo({todo_id, title, items, timestamp})
        res.status(200).send(updated)
    }
}
 