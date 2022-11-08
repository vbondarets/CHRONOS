import axios from 'axios'

export const registerUser = (login,full_name, email,password) => 
    axios.post("http://127.0.0.1:3001/api/auth/register/",{login:login, full_name:full_name, email:email,password:password})

export const loginn = (email,login,password) => 
    axios.post("http://127.0.0.1:3001/api/auth/login/",{email:email,login:login,password:password})

export const getUser = (id) => axios.get(`http://127.0.0.1:3001/api/users/${id}`)

export const resetPass = (email) => axios.post(`http://127.0.0.1:3001/api/auth//password-reset`, {email: email})

export const resetToken = (token, password) => axios.post(`http://127.0.0.1:3001/api/auth//password-reset/${token}`, {password: password})