import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import style from "../style/Navbar.module.css"
import { useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import { useSelector } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar= () => {
    const history = useHistory()
    const [isAuth, setAuth] = useState()
    const auth = useSelector(state=>state.Auth)
    const tokenn = auth.token
    let decode, user_id, role
    if (tokenn === '') {
        
    }
    else {
        decode = jwt_decode(tokenn)
        user_id = decode.id
        role = decode.role
    }
    const token = Cookies.get('token')   
 
    useEffect ( () => {
        if (token) {
            setAuth(true)
        }
        else {
            setAuth(false)
        }      
    }, [token])
    // if (token) {
    //     isAuth = true
    // }
    // else {
    //     isAuth = false
    // }
    return (
        isAuth ? 
        <>
            {role === 'admin' ? 
                <>
                    <h1 className={style.h1Navbar}>INSPACE<img src="http://localhost:3001/avatar/logo.png" className ={style.Logo} alt="logo"></img></h1>
                    <div >
                        <ul className={style.ulNavbar}> 
                            <li className={style.liNavbar}><a className={style.aNavbar} onClick={()=>{history.push("/home")}}>Home<HomeIcon /></a></li>
                            <li className={style.liNavbar}><a className={style.aNavbar} onClick={()=>{history.push("/users")}}>Users</a></li>
                            <li className={style.liNavbar}><a className={style.aNavbar} onClick={()=>{history.push("/categories")}}>Categories</a></li>
                            <li className={style.liNavbarAdmin}><a className={style.aNavbar} onClick={() => {
                                                    history.push(`/user/${user_id}`)}}>{decode.login
                                                         }</a>
                            </li>
                            <li className={style.liNavbar}><Button onClick={()=>{Cookies.remove('token')
                                                                                setAuth(false)}}>Logout <LogoutIcon/></Button></li>

                        </ul>
                        
                    </div>
                </>
                :
                <>
                    <h1 className={style.h1Navbar}>INSPACE<img src="http://localhost:3001/avatar/logo.png" className ={style.Logo} alt="logo"></img></h1>
                    <div >
                        <ul className={style.ulNavbar}> 
                            <li className={style.liNavbar}><a className={style.aNavbar} onClick={()=>{history.push("/home")}}>Home<HomeIcon /></a></li>
                            <li className={style.liNavbar}><a className={style.aNavbar} onClick={()=>{history.push("/users")}}>Users</a></li>
                            <li className={style.liNavbarUser}><a className={style.aNavbar} onClick={() => {
                                                                    history.push(`/user/${user_id}`)
                                                                }}>
                                                                {decode.login}
                                                          </a>
                            </li>
                            <li className={style.liNavbar}><Button onClick={()=>{Cookies.remove('token')
                                                                                setAuth(false)}}>Logout <LogoutIcon/></Button></li>

                        </ul>
                        
                    </div>
                </>
            }   
        </>
        :
        <>
            <h1 className={style.h1Navbar}>INSPACE<img src="http://localhost:3001/avatar/logo.png" className ={style.Logo} alt="logo"></img></h1>
            <div>
                <ul className={style.ulNavbar}>
                    <li className={style.liNavbar}><a className={style.aNavbar} onClick={()=>{history.push("/home")}}>Home <HomeIcon /></a></li>
                    <li className={style.liNavbar}><a className={style.aNavbar} onClick={()=>{history.push("/register")}}>Users</a></li>
                    <li className={style.liNavbarRegister}><a className={style.aNavbar} onClick={()=>{history.push("/register")}}>Register</a></li>
                    <li className={style.liNavbar}><a className={style.aNavbar} onClick={()=>{history.push("/login")}}>Login</a></li>
                </ul>
            </div>
                
        </>
        
    );
}


export default Navbar;