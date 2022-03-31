import { combineReducers, createStore } from "redux"
import ClockReducer from "./ClockReducer"

const reducers = combineReducers({
    clockPage: ClockReducer
})

const store = createStore(reducers)

export default store