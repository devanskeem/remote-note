const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    user_id: null
}
const UPDATE_USER = "UPDATE_USER"

export function updateUser(user) {
    console.log(user)
    return {
        type: UPDATE_USER,
        payload: user
    }
}


function userReducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_USER:
            const {username, first_name, last_name, user_id} = action.payload
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default userReducer