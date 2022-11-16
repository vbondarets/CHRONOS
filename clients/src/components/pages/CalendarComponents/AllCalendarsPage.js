import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarsById } from "../../../action/CalendarAction";
import jwt_decode from 'jwt-decode'
import { useHistory } from "react-router-dom";
import MyModal from "../../UI/MyModal/MyModal";
import ShareCalendarForm from "../../forms/ShareCalendarFrom";
import ShareCalendarModal from "../../UI/MyModal/ShareCalendarModal";

const AllCalendarsPage = () => {
    const Calendars = useSelector(state => state.Calendar)
    const auth = useSelector(state=>state.Auth)
    const [calendarid, setCalendar_id] = useState()
    //check user_id
    const tokenn = auth.token
    let decode, user_id
    decode = jwt_decode(tokenn)
    user_id = decode.id

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
                {AllCalendars.map( calendars => {
                    return(
                    <>
                        <ShareCalendarModal visible={visible} setVisible = {setVisible}>
                            <ShareCalendarForm calendar_id={calendarid} />
                        </ShareCalendarModal>
                        <div key={calendars.id}>
                            <p onClick={ () => history.push(`/calendar/${calendars.id}`)}>Title: {calendars.title}</p>
                            <button  onClick={ (e) => {
                                setCalendar_id(calendars.id)
                                setVisible(true)
                            }}>Share</button>
                            <button onClick={ () => {
                                
                            }}>Delete</button>
                        </div>
                    </>
                    )
                })}   
            </>
        )
    }
}

export default AllCalendarsPage