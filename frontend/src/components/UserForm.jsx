import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';


const UserForm = ({ fetchFunc }) => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [message, setMesage] = useState('');


    useEffect(() => {

    }, [])
    const sendReqReg = (e) => {
        console.log("registration...")
        e.preventDefault();
        if (login && email && password && fullName) {
            const User = {
                login: login,
                email: email,
                password: password,
                fullName: fullName
            }
            fetchFunc(User, setLogin, setEmail, setPassword, setFullName, setMesage);
        }
        else {
            setMesage("Fill all fields pls");
            return;
        }
    }
    return (
        <div>
            <MyInput
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder="email"
            />
            <MyInput
                value={login}
                onChange={e => setLogin(e.target.value)}
                type="text"
                placeholder="login"
            />
            <MyInput
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <MyInput
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                type="text"
                placeholder="Full Name"
            />
            <h3>{message}</h3>
            <MyButton onClick={e => sendReqReg(e)}>Submit</MyButton>
        </div>
    )
}


export default UserForm