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
export const getEventId = (event_id) => api.get(`http://127.0.0.1:3001/api/event/event/${event_id}`)
export const shareEvent = (event_id, user_id) => api.post(`http://127.0.0.1:3001/api/event/share/${event_id}`, {user_id: user_id})
export const createevent = (title, description, type, color, start_at, end_at, calendar_id) => 
api.post(`http://127.0.0.1:3001/api/event/${calendar_id}`, {title: title, description: description, type: type, color: color, start_at:start_at, end_at: end_at})

export const deleteEvent = (calendar_id, event_id) => api.delete(`http://127.0.0.1:3001/api/event/${calendar_id}/delete/${event_id}`)