import {combineReducers} from "redux";
import { AuthReducer } from "./AuthReducer";
import { EventReducer } from "./EventReducer";


const Reducer = combineReducers({
    Auth:AuthReducer,
    Event:EventReducer
})

export default Reducer
