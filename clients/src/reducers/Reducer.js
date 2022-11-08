import {combineReducers} from "redux";
import { AuthReducer } from "./AuthReducer";


const Reducer = combineReducers({
    Auth:AuthReducer,
    
})

export default Reducer
