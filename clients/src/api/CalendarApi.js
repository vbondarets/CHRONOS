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
export const getAllCalendar = () => api.get('http://127.0.0.1:3001/api/calendar/')
export const getAllUsers = (calendar_id) => api.get(`http://127.0.0.1:3001/api/calendar/users/${calendar_id}`)
export const getAuthor = (calendar_id) => api.get(`http://127.0.0.1:3001/api/calendar/author/${calendar_id}`)

export const SubmitSharing = (token) => api.get(`http://127.0.0.1:3001/api/calendar/share/${token}`)
export const SharingCalendar = (user_id, calendar_id) => api.post(`http://127.0.0.1:3001/api/calendar/share/${calendar_id}`, {user_id})
export const updateCalendar = (calendar_id, title, description) => api.patch(`http://127.0.0.1:3001/api/calendar/update/${calendar_id}`, {title:title, description:description})
export const hideCalendar = (calendar_id) => api.post(`http://127.0.0.1:3001/api/calendar/hide/${calendar_id}`)
export const importcalendar = (calendar_id) => api.post(`http://127.0.0.1:3001/api/calendar/import/${calendar_id}`)
export const createCalendar = (title ,description, color) => api.post(`http://127.0.0.1:3001/api/calendar/`, {title:title, description: description, color: color})
export const deleteCalendar = (user_id, calendar_id) => api.delete(`http://127.0.0.1:3001/api/calendar/delete/${calendar_id}/${user_id}`)
export const deleteAccess = (user_id, calendar_id) => api.delete(`http://127.0.0.1:3001/api/calendar/delete/${calendar_id}/user/${user_id}`)