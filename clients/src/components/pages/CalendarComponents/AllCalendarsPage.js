import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUserCalendar, getCalendarsById } from "../../../action/CalendarAction";
import jwt_decode from 'jwt-decode'
import { useHistory } from "react-router-dom";
import MyModal from "../../UI/MyModal/MyModal";
import ShareCalendarForm from "../../forms/ShareCalendarFrom";
import ShareCalendarModal from "../../UI/MyModal/ShareCalendarModal";
import CreateCalendarForm from "../../forms/CreateCalendarForm";
import style from '../../style/CalendarsPage.module.css'
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const AllCalendarsPage = () => {
    const Calendars = useSelector(state => state.Calendar)
    const auth = useSelector(state=>state.Auth)
    const [calendarid, setCalendar_id] = useState()
    //check user_id
    const tokenn = auth.token
    let decode, user_id,login
    decode = jwt_decode(tokenn)
    user_id = decode.id
    login = decode.login

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect ( () => {
        dispatch(getCalendarsById(user_id))
    }, [dispatch])

    const shareButton = (e) => {
        setVisible(true)
        console.log("hyu");
    }
    const [visible, setVisible] = useState(false)
    const [vis, setVis] = useState(false)
    let AllCalendars = Calendars.AllCalendarsById
    if (Calendars.AllCalendarsById === []) {
        AllCalendars = []
    }
    if (tokenn === '') {
        return (<>Please login</>)
    }
    else {
        return (
            <>
            <MyModal visible={vis} setVisible ={setVis}>
                <CreateCalendarForm user_id={user_id}/>
            </MyModal>
                <button className={style.createButton} onClick={ () => setVis(true)}>Create Calendar  <AddIcon /></button>
                <div className={style.Container} >
                    {AllCalendars.map( calendars => {
                        return(
                        <>
                            <ShareCalendarModal visible={visible} setVisible = {setVisible}>
                                <ShareCalendarForm calendar_id={calendarid} />
                            </ShareCalendarModal>
                            <div className={style.Content} key={calendars.id}>
                                <div className={style.Calendar}>
                                    <p onClick={ () => history.push(`/calendar/${calendars.id}`)}>Title: {calendars.title}</p>
                                    <p>Description: {calendars.description}</p>
                                    {calendars.author_id === user_id ? <><button className={style.shareButton} onClick={ (e) => {
                                        setCalendar_id(calendars.id)
                                        setVisible(true)
                                    }}>Share <ShareIcon /></button></> : <></>}
                                    {calendars.title === `${login} Calendar` || calendars.title === `National Calendar ${login}` ? <></> :
                                        <button className={style.deleteButton} onClick={ () => {
                                            console.log(calendars.id);
                                            dispatch(DeleteUserCalendar(user_id, calendars.id))
                                        }}>Delete <DeleteIcon /></button>
                                    }
                                </div>
                            </div>
                        </>
                        )
                    })}
                </div>   
            </>
        )
    }
}

export default AllCalendarsPage