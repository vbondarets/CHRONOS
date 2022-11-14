import {combineReducers} from "redux";
import { AuthReducer } from "./AuthReducer";
import { CalendarReducer } from "./CalendarReducer";
import { EventReducer } from "./EventReducer";


const Reducer = combineReducers({
    Auth:AuthReducer,
    Event:EventReducer,
    Calendar:CalendarReducer
})

export default Reducer
