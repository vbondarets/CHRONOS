import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../action/UserAction";
import AddBoxIcon from '@mui/icons-material/AddBox';
import style from '../UI/button/MyButton.module.css'
import { ShareCalendar } from "../../action/CalendarAction";
import jwt_decode from 'jwt-decode'
import { ShareEvent } from "../../action/EventAction";

const ShareEventForm = ({event_id, calendar_id, setVisiblity}) => {
    const UserStore = useSelector(store => store.User)
    const auth = useSelector(state=>state.Auth)
    const [message, setMessage] = useState(false)

    const tokenn = auth.token
    let decode, user_id
    decode = jwt_decode(tokenn)
    user_id = decode.id
    
    const dispatch = useDispatch()
    useEffect ( () => {
        dispatch(getAllUsers())
    },[dispatch])

    let AllUsers = UserStore.allUsers
    if (AllUsers === undefined) {
        AllUsers = []
    }
    return ( 
        <div>
            <h1>Share event with users</h1>
            {AllUsers.map( users => {
                if (users.id != user_id) {
                    return(
                    <>
                        <p style={{
                            border:'1px solid black',
                            padding:'5px',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between',
                            fontSize:'20px'
                        }} key={users.id}>{users.login} <AddBoxIcon onClick = {
                            () => {
                                dispatch(ShareEvent(event_id, users.id, calendar_id))
                                setMessage(true)
                                setVisiblity(false)
                            }
                        } className={style.ShareButton}></AddBoxIcon></p>
                    </>
                    )
                }
            })}
            {message === true ? <p style={{color:'green'}}>Invite was sent</p> : <></>}
        </div>
    )
}

export default ShareEventForm