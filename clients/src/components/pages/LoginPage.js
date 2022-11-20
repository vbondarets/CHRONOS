import React, { useContext } from "react";
import { useState } from "react";
import { loginUser } from "../../action/AuthAction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import style from '../style/UserForm/LoginStyle.module.css'
import LoginIcon from '@mui/icons-material/Login';

const LoginPage = () => {
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [message ,setMessage] = useState('')
    const [status ,setStatus] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const setError = (text) => {
        console.log(text)
        setMessage(text)
        setTimeout(()=>  setMessage(''), 2000)
    }

    const submit = e => {
        e.preventDefault()
        dispatch(loginUser(login,password,email, setError, setStatus))
        if(status){
            history.push('/calendar')
        }
    }
    return (
        <div className={style.LoginDiv}>
            <div className={style.LoginForm}>
                <h1>
                    Login    
                </h1>
                <div>
                    <p>Email: 
                    <input type="email" name="email" placeholder="Please paste your email"
                        maxLength={52} required={true} 
                        value = {email} onChange= {e=>setEmail(e.target.value)}
                    />
                    </p>
                    <p>Login: 
                    <input type="text" name="login" placeholder="Please paste your login"
                        maxLength={52} required={true} value={login} 
                        onChange = {e=>setLogin(e.target.value)}
                    />
                    </p>
                    <p>Password: 
                    <input type="password" name="password" placeholder="Please paste your password"
                        minLength={24} required={true} 
                        value = {password} onChange= {e => setPassword(e.target.value)}
                    /> 
                    </p>
                    <h4 style={{color: 'red'}}>{message}</h4>
                    <div className={style.divSubmit}>
                        <a className={style.linkLogin} onClick={()=>{history.push(`/register`)}}>Haven't account?</a>
                        <a onClick={()=>{history.push('/reset-password')}} className={style.linkLogin1}>Forget your password?</a>
                        <button onClick={submit} className={style.buttonLogin}>Login<LoginIcon /></button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default LoginPage;