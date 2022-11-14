import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventComponent from "./EventCalendar";
import MonthComponent from "./MonthComponent";
import moment from 'moment'
import { getAllEventByCalendar } from "../../../action/EventAction";
import style from '../../style/CalendarStyle.module.css'
import { useParams } from "react-router-dom";
moment.updateLocale(moment.locale(),{week:{dow:1}})


const EventPage = () => {
    const {calendar_id} = useParams()
    const event = useSelector(state => state.Event)

    const [now, setNow] = useState(moment())
    const [months, setMonths] = useState(now.month())
    const [year, setYear] = useState(now.year())

    const dispatch = useDispatch()
    useEffect ( () => {
        dispatch(getAllEventByCalendar(calendar_id))
    }, [dispatch])

    let AllEvents = []
    AllEvents = event.events
    if (AllEvents === undefined) {
        AllEvents = []
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.container_of_Calendar}>
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
                />
            </div>  
        </div>
    )
}

export default EventPage