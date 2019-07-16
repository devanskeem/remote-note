import {createStore, combineReducers} from 'redux'
import userReducer from './userReducer'
import dataReducer from './dataReducer'

const rootReducer = combineReducers({
    userReducer,
    dataReducer
})
const store = createStore(rootReducer)

export default store;