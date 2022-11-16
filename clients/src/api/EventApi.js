import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL:"http://127.0.0.1:3001/api"
})
const authIntreceptors = config => {
    config.headers.authorization = `Bearer ${Cookies.get('token')}` 
    return config
}
api.interceptors.request.use(authIntreceptors)

export const getEvents = (calendar_id) => api.get(`http://127.0.0.1:3001/api/event/${calendar_id}`) 
export const getLatestEvents = (user_id) => api.get(`http://127.0.0.1:3001/api/event/newest_events/${user_id}`)

export const createevent = (title, description, type, color, time, calendar_id) => 
            api.post(`http://127.0.0.1:3001/api/event/${calendar_id}`, {title: title, description: description, type: type, color: color, time:time})