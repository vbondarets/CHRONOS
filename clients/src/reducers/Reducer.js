import {combineReducers} from "redux";
import { AuthReducer } from "./AuthReducer";
import { CalendarReducer } from "./CalendarReducer";
import { EventReducer } from "./EventReducer";
import { UserReducer } from "./UserReducer";


const Reducer = combineReducers({
    Auth:AuthReducer,
    Event:EventReducer,
    Calendar:CalendarReducer,
    User:UserReducer
})

export default Reducer
