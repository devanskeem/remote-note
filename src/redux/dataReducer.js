const initialState = {
    notes: [],
    reminders: [],
    todos: []
}

const UPDATE_NOTES = "ADD_NOTES"
const UPDATE_REMINDERS = "ADD_REMINDERS"
const UPDATE_TODOS = "ADD_TODOS"


export function updateReminders(reminders) {
    return {
        type: UPDATE_REMINDERS,
        payload: reminders
    }
}
export function updateTodos(todos) {
    return {
        type: UPDATE_TODOS,
        payload: todos
    }
}
export function updateNotes(notes) {
    return {
        type: UPDATE_NOTES,
        payload: notes
    }
}

function dataReducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_NOTES:
            return {...state, notes: action.payload}
        case UPDATE_REMINDERS:
            return {...state, reminders: action.payload}
        case UPDATE_TODOS:
            return {...state, todos: action.payload}
        default:
            return state
    }
}

export default dataReducer