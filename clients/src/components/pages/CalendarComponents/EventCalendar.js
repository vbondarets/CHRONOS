import React from "react";
import { useState } from "react";
import EventForm from "../../forms/EventForm";
import style from '../../style/CalendarStyle.module.css'
import MyModal from "../../UI/MyModal/MyModal";

const EventComponent = (props) => {
    const {now, AllEvents, calendar_id} = props
    
    const now_for_lastday = now.clone()
    const now_for_startday = now.clone()

    const lastday = now_for_lastday.endOf('month').endOf('week')
    const startday = now_for_startday.startOf('month').startOf('week')
    let day = startday.clone()

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const calendar = []
    const value_of_calendar = []
    const [modal, setModal] = useState(false);
    const [date, setDate] = useState(false);

    while (!day.isAfter(lastday)) {
        calendar.push(day.date())
        value_of_calendar.push(day.format('YYYY-MM-DD'))
        day.add(1,'day')
    }
    const dayNow = now.format('YYYY-MM-DD')
    return (
        <>
            <MyModal visible={modal} setVisible={setModal}>
                <EventForm 
                    date={date}
                    calendar_id = {calendar_id}
                />
            </MyModal>
            <ul>
                {days.map(index => {
                    return (
                        <li key={index} className={style.DaysName}>{index}</li>
                    )
                })} 
                {calendar.map( (call,index) => {        
                    return(
                        <li 
                            value = {value_of_calendar[index]} 
                            key={index}
                            onClick={ e => {
                                console.log(value_of_calendar[index]);
                                setDate(value_of_calendar[index]);
                                setModal(true);
                            }}
                        >{value_of_calendar[index] === dayNow ? <b style={{
                           color:'red'
                        }}>{call}</b> : <>{call}</>}
                            {AllEvents.map(event => {
                                if (event.time.substring(0,10) === value_of_calendar[index]) {
                                    return (
                                        <p style = {{backgroundColor:event.color}} className = {style.Event} key={event.id}>
                                            {event.title}
                                        </p>
                                    )
                                }
                            })}
                        </li>
                    )
                })
                }
            </ul>
        </>
    )
}

export default EventComponent