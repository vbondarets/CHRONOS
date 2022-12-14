import { getUser, registerUser, resetPass, resetToken } from '../api/AuthApi'
import {loginn} from '../api/AuthApi'
import Cookie from "js-cookie"
import { useHistory } from 'react-router-dom'
export const register = (login,full_name, email,password) => async(dispatch) => {
    try {
        const {data} = await registerUser(login,full_name, email,password)
        console.log(data);
        dispatch({type:'register', payload: data})   
    } catch (error) {
        console.log(error);
    } 
}

export const loginUser = (login,password,email, callback, setStatus) => async (dispatch) => {
    try {
        if (!login || !password || !email) {
            return callback("Fill all required fields")
        }
        const {data} = await loginn(email,login,password)
        Cookie.set('token', data.token,{expires:7})
        dispatch({type:'login', payload:data.token})
        setStatus(true);
    } catch (e) {
        console.log("poehali");
        callback('Check login, email or password');
        // alert("Check login, email or password")
    }
}

export const tokenConfirm = (token, password, callback) => async(dispatch) => {
    try {
        const {data} = await resetToken(token, password)
        console.log(data);
        if (data.message === 'Your password was changed') {
            callback('Your password was changed')
            
            return dispatch ({type:'tokenconfirm', payload:'Ok'})
        }
    } catch (error) {
        console.log(error);
    }
}

export const Reset_Password = (email) => async(dispatch) => {
    try {
        const {data} = await resetPass(email)
        if (data.message === 'Email was sent') {
            return dispatch({type: 'resetpassword', payload:data.message})
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUser_by_id = (id) => async (dispatch) => {
    try {
        const {data} = await getUser(id)
        dispatch({type:'getuser_by_id', payload:data.result})
    } catch (error) {
        console.log(error);
    }
}