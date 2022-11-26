import React from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from 'jwt-decode'
import style from '../UI/button/MyButton.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DeleteAccessToCalendar } from "../../action/CalendarAction";

const UserSharedForm = ({AllUsers, calendar_id}) => {
    const auth = useSelector(state=>state.Auth)
    const dispatch = useDispatch()
    const tokenn = auth.token
    let user_id, decode
    decode = jwt_decode(tokenn)
    user_id = decode.id
    return (
        <>
            <h1>Calendar Users</h1>
            {AllUsers.map(user => {
                if (user.user_id != user_id) {
                    return(
                    <div>
                        <p style={{
                            border:'1px solid black',
                            padding:'5px',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between',
                            fontSize:'20px'
                        }} key={user.user_id}>{user.login} <DeleteForeverIcon onClick = { () => {
                            dispatch(DeleteAccessToCalendar(user.user_id, calendar_id))
                        }} className={style.ShareButton}>Delete Access</DeleteForeverIcon></p>
                    </div>)
                }
            })}
        </>
    )
}

export default UserSharedForm