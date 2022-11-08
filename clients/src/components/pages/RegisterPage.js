import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../../action/AuthAction";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import style from '../style/UserForm/RegisterStyle.module.css'

const RegisterPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [login, setLogin] = useState("")
    const [email, setEmail] = useState("")
    const [full_name, setFull_name] = useState("")
    const [password, setPassword] = useState("")
    const submit = e => {
        e.preventDefault()
        dispatch(register(login,full_name, email,password))
        history.push('/login')
    }
    return (
        <div className={style.RegisterDiv}>
            <div className={style.RegisterForm}>
                <h1 className={style.h1Register}>
                    Registration       
                </h1>
                <div>
                    <p>Login: 
                    <input type="text" name="login" placeholder="Please paste your login"
                        maxLength={20} autoFocus required={true} value={login} 
                        onChange = {e=>setLogin(e.target.value)}
                        
                    />
                    </p>
                    <p>E-mail: 
                    <input type="email" name="email" placeholder="Please paste your email"
                        maxLength={20} autoFocus required={true} 
                        value = {email} onChange= {e=>setEmail(e.target.value)}
                    />
                    </p>
                    <p>Full Name: 
                    <input type="text" name="full_name" placeholder="Please paste your Full name"
                        maxLength={20} autoFocus required={true} 
                        value = {full_name} onChange= {e => setFull_name(e.target.value)}
                    />
                    </p>
                    <p>Password: 
                    <input type="password" name="password" placeholder="Please paste your password"
                        minLength={8} autoFocus required={true} 
                        value = {password} onChange= {e => setPassword(e.target.value)}
                    /> 
                    </p>
                    <div className={style.divSubmit}>
                        <a onClick={()=>{history.push(`/login`)}} className={style.linkRegister}>Already have an account?</a>
                        <button onClick={submit} className={style.buttonRegister}>Register</button>
                    </div>
                    
                </div>
            </div>
        </div>
        
    );
}

export default RegisterPage;