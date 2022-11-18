import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllEventByCalendar } from "../../../action/EventAction";

const DayPage = () => {
    const value_of_date = []
    const {day, calendar_id} = useParams()
    const event = useSelector(state => state.Event)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getAllEventByCalendar(calendar_id))
    },[dispatch])
    
    let AllEvent = event.events
    if (AllEvent === undefined) {
        AllEvent = []
    }
    console.log(calendar_id);
    const time = []
    for (let index = 0; index < 24; index+=1) {
        for (let i = 0; i < 60; i+=15) {
            if (index < 10 ) {
                if (i === 0) {
                    time.push(`0${index}:0${i}`)    
                }
                else {
                    time.push(`0${index}:${i}`)
                }
            } 
            
            else {
                if (i === 0) {
                    time.push(`${index}:0${i}`)
                }
                else {
                    time.push(`${index}:${i}`)
                }
            }
        }
    }
    for (let index = 0; index < 96; index++) {
        value_of_date.push(`${day} ${time[index]}`)
        
    }
    console.log(value_of_date);
    return(
        <>
            <ul>
                {time.map( (date, index) => {
                    return (
                        <li value={value_of_date[index]} key={value_of_date[index]}>
                            {date}
                            {AllEvent.map(ev => {
                                if (moment(ev.time).format('YYYY-MM-DD HH:mm') === value_of_date[index]) {
                                    console.log(moment(ev.time).format('YYYY:MM:DD HH:mm').toString());
                                    return(<p key={ev.id}>{ev.title}</p>)
                                }
                            })}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default DayPage