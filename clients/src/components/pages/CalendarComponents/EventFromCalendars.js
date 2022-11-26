import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventComponent from "./EventCalendar";
import MonthComponent from "./MonthComponent";
import moment from 'moment'
import jwt_decode from 'jwt-decode'
import { getAllEventByCalendar, SortByType } from "../../../action/EventAction";
import style from '../../style/CalendarStyle.module.css'
import { useHistory, useParams } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GetAllUsersOnCalendar, getAuthorOfCalendar } from "../../../action/CalendarAction";
import ShareCalendarModal from "../../UI/MyModal/ShareCalendarModal";
import UserSharedForm from "../../forms/UserSharedCalendar";
import GroupIcon from '@mui/icons-material/Group';
moment.updateLocale(moment.locale(),{week:{dow:1}})

const EventPage = () => {
    const {calendar_id} = useParams()
    const [visible, setVisible] = useState(false)
    const event = useSelector(state => state.Event)
    const calendar = useSelector(store => store.Calendar)
    const auth = useSelector(state=>state.Auth)
    const tokenn = auth.token
    let user_id, decode
    decode = jwt_decode(tokenn)
    user_id = decode.id

    const [now, setNow] = useState(moment())
    const [months, setMonths] = useState(now.month())
    const [year, setYear] = useState(now.year())

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect ( () => {
        dispatch(getAllEventByCalendar(calendar_id))
        dispatch(getAuthorOfCalendar(calendar_id))
        dispatch(GetAllUsersOnCalendar(calendar_id))
    }, [dispatch])
    
    let author = calendar.author
    let AllEvents = event.events
    let AllUsers = calendar.allUsers
    console.log(AllUsers);
    if (author === undefined) {
        author = []
    }
    if (AllEvents === undefined) {
        AllEvents = []
    }
    if (AllUsers === undefined) {
        AllUsers = []
    }
    else {
        return (
            <div className={style.mainContainer}>
                <ShareCalendarModal visible={visible} setVisible ={setVisible}>
                    <UserSharedForm AllUsers={AllUsers} calendar_id={calendar_id}/>
                </ShareCalendarModal>
                <div className={style.container_of_Calendar}>
                    <button className={style.createBuuton} onClick = { () => {history.push(`/calendar/${calendar_id}/create_event`)}}>Create event <AddCircleIcon /></button>
                    {author === user_id ? 
                    <>
                        <button onClick={() => {setVisible(true)}} className={style.createBuuton}>Calendar Users <GroupIcon/></button>
                    </> 
                    : 
                    <>
                    </>}
                    <div onChange={ e => dispatch(SortByType(calendar_id, e.target.value))}>
                        <p>Choose category:</p>
                        <input type ='radio' name = 'category' id = 'all' value = 'all' />
                        <label htmlFor='all'>All Events</label>
                        <input type ='radio' name = 'category' id = 'arrangement' value = 'arrangement' />
                        <label htmlFor='arrangement'>Arrangement</label>
                        <input type ='radio' name = 'category' id = 'task' value = 'task' />
                        <label htmlFor='task'>Task</label>
                        <input type ='radio' name = 'category' id = 'reminder' value = 'reminder' />
                        <label htmlFor='reminder'>Reminder</label>
                    </div>
                    <MonthComponent
                        setMonths ={setMonths}
                        setNow = {setNow}
                        setYear = {setYear}
                        now = {now}
                        months = {months}
                        year = {year}
                    />
                    <EventComponent 
                        now = {now}
                        AllEvents = {AllEvents}
                        calendar_id = {calendar_id}
                    />
                </div>  
            </div>
        )

    }
}

export default EventPage