import moment from "moment";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import EventForm from "../../forms/EventForm";
import EventView from "../../forms/EventView";
import style from '../../style/CalendarStyle.module.css'
import EventModal from "../../UI/MyModal/ModalForEvent";
import MyModal from "../../UI/MyModal/MyModal";

const EventComponent = (props) => {
    const {now, AllEvents, calendar_id} = props
    
    const history = useHistory()
    const now_for_lastday = now.clone()
    const now_for_startday = now.clone()

    const lastday = now_for_lastday.endOf('month').endOf('week')
    const startday = now_for_startday.startOf('month').startOf('week')
    let day = startday.clone()

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const calendar = []
    const value_of_calendar = []
    const [modal, setModal] = useState(false);
    const [eventModal, setEventModal] = useState(false);
    const [date, setDate] = useState(false);
    let [currentEvent, setCurrentEvent] = useState()

    if (currentEvent === undefined) {
        currentEvent =[]
    }
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
            <EventModal visible={eventModal} setVisible={setEventModal}>
                <EventView
                    event = {currentEvent}
                />
            </EventModal>
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
                            onClick={ (e) => {
                                e.stopPropagation()
                                setDate(value_of_calendar[index]);
                                setModal(true);
                            }}
                        >{value_of_calendar[index] === dayNow ? <b onClick={ (e) => 
                            {
                                e.stopPropagation();
                                // e.stopPropagation();
                                history.push(`/calendar/${calendar_id}/day/${value_of_calendar[index]}`)
                            }} style={{
                           color:'red',
                        }}>{call}</b> : <><div 
                            style={{width: "fit-content", height: "fit-content"}}
                            onClick={(e) =>{
                                e.stopPropagation();
                                history.push(`/calendar/${calendar_id}/day/${value_of_calendar[index]}`)
                             }}
                            >{call}</div></>}
                            {AllEvents.map((event, indx) => {
                                if (moment(event.start_At).format('YYYY-MM-DD') === value_of_calendar[index]) {
                                    return (
                                        <p 
                                            style = {{backgroundColor:event.color, color:'white', borderRadius:'10px'}} 
                                            className = {style.Event} 
                                            key={event.id}
                                            onClick = {(e) => {
                                                e.stopPropagation()
                                                
                                                setCurrentEvent(AllEvents[indx]);
                                                setEventModal(true)
                                            }}
                                            
                                        >
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