const initialState = {
    notes: [],
    reminders: [],
    todos: [],
    currentDisplay: []
}

const UPDATE_NOTES = "UPDATE_NOTES"
const UPDATE_REMINDERS = "UPDATE_REMINDERS"
const UPDATE_TODOS = "UPDATE_TODOS"
const UPDATE_CURRENT_DISPLAY = "UPDATE_CURRENT_DISPLAY"

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

export function updateCurrentDisplay(currentDisplay) {
    const sorted = currentDisplay.sort((a, b) => {
        return a.timestamp > b.timestamp ? -1 : 1
    })
    return {
        type: UPDATE_CURRENT_DISPLAY,
        payload: sorted
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
        case UPDATE_CURRENT_DISPLAY:
            return {...state, currentDisplay: action.payload}
        default:
            return state
    }
}

export default dataReducer