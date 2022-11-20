import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {Reset_Password } from "../../action/AuthAction";
import style from '../style/UserForm/ResetPassword.module.css'

const ResetPassword = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    let [email, setEmail] = useState('')
    let [index, setIndex] = useState(0)
    const [message, setMessage] = useState('');

    const setError = (text) =>{
        setMessage(text)
        setTimeout(() => setMessage(''), 2000)
    }

    return (
        <div className={style.divResetPassword}>
            <h1>Reset password</h1>
            <p>E-mail: 
            <input autoFocus required 
                placeholder="Enter your email"
                value = {email} type="email" 
                onChange={ e => setEmail(e.target.value)} />
            </p>
            <a onClick={()=>{history.push("/login")}}>Remember login?</a>
            <h4>{message}</h4>
            <button onClick={ () => {
                setIndex(1)
                dispatch(Reset_Password(email, setError))
            }
            }>Reset Password</button>
            {index === 1 ? <p className={style.sendEmailP}>Mail was send. Check your email</p> : <></>}
        </div>
    )
}

export default ResetPassword