import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../action/UserAction";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { padding } from "@mui/system";
import style from '../UI/button/MyButton.module.css'
import { ShareCalendar } from "../../action/CalendarAction";


const ShareCalendarForm = ({calendar_id}) => {
    const UserStore = useSelector(store => store.User)

    const dispatch = useDispatch()
    useEffect ( () => {
        dispatch(getAllUsers())
    },[dispatch])
    console.log(calendar_id);

    let AllUsers = UserStore.allUsers
    if (AllUsers === undefined) {
        AllUsers = []
    }
    else {
        console.log(AllUsers);
    }

    return ( 
        <div>
            <h1>Share calendar with users</h1>
            {AllUsers.map( users => {
                return(<p style={{
                    border:'1px solid black',
                    padding:'5px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between',
                    fontSize:'20px'
                }} key={users.id}>{users.login} <AddBoxIcon onClick = {
                    () => {
                        dispatch(ShareCalendar(calendar_id, users.id))
                    }
                } className={style.ShareButton}></AddBoxIcon></p>)
            })}
        </div>
    )
}

export default ShareCalendarForm