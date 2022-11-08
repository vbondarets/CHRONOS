import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { tokenConfirm } from "../../action/AuthAction";
import style from '../style/UserForm/ConfirmPassword.module.css'

const TokenReset = () => {
    const {confirm_token} = useParams()
    const dispatch = useDispatch()
    let [password, setPassword] = useState('')
    const history = useHistory()
    return (
        <div className={style.ConfirmPasswordDiv}>
            <h1>Confirm password</h1>
            <p>New password:
                <input name = 'password' autoFocus required
                value = {password} type='password'
                placeholder="Enter new password"
                onChange={ e => setPassword(e.target.value)} />
            </p>
            <button onClick={ () => {dispatch(tokenConfirm(confirm_token, password))
                                    history.push('/login')
                                    }}>Reset Password</button>
        </div>
    )
}

export default TokenReset