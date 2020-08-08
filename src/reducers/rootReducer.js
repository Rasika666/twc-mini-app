import {combineReducers} from 'redux'
import dummyusersReducer from './dummyusersReducer'
import modalReducer from './modalReducer'
import authReducer from './authReducer'


const rootReducer =  combineReducers({
     dummyusers: dummyusersReducer,
     modal: modalReducer,
     auth: authReducer
})

export default rootReducer