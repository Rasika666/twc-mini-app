import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'


const initstate = {}
const middlware = [thunk]
const store = createStore(
    rootReducer,
    initstate,
    composeWithDevTools(applyMiddleware(...middlware))
)

export default store