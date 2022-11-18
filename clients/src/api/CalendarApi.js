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

export const CalendarById = (user_id) => api.get(`http://127.0.0.1:3001/api/calendar/${user_id}`)
export const SubmitSharing = (token) => api.get(`http://127.0.0.1:3001/api/calendar/share/${token}`)
export const SharingCalendar = (user_id, calendar_id) => api.post(`http://127.0.0.1:3001/api/calendar/share/${calendar_id}`, {user_id})
export const createCalendar = (title) => api.post(`http://127.0.0.1:3001/api/calendar/`, {title:title})
export const deleteCalendar = (user_id, calendar_id) => api.delete(`http://127.0.0.1:3001/api/calendar/delete/${calendar_id}/${user_id}`)