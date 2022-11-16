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

export const getAllU = () => api.get('/users')
