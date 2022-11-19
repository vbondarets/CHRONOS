import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventComponent from "./EventCalendar";
import MonthComponent from "./MonthComponent";
import moment from 'moment'
import { getAllEventByCalendar } from "../../../action/EventAction";
import style from '../../style/CalendarStyle.module.css'
import { useHistory, useParams } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
moment.updateLocale(moment.locale(),{week:{dow:1}})

const EventPage = () => {
    const {calendar_id} = useParams()
    const event = useSelector(state => state.Event)
    
    const [now, setNow] = useState(moment())
    const [months, setMonths] = useState(now.month())
    const [year, setYear] = useState(now.year())

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect ( () => {
        dispatch(getAllEventByCalendar(calendar_id))
    }, [dispatch])

    let AllEvents = event.events
    if (AllEvents === undefined) {
        AllEvents = []
    }
    console.log(AllEvents);
    return (
        
        <div className={style.mainContainer}>
            <div className={style.container_of_Calendar}>
            <button className={style.createBuuton} onClick = { () => {history.push(`/calendar/${calendar_id}/create_event`)}}>Create event <AddCircleIcon /></button>
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

export default EventPage