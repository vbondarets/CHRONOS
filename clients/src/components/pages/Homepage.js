import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { getAllEventByCalendar } from "../../action/EventAction";

const HomePage = () => {
    const event = useSelector(state => state.Event)

    moment.updateLocale(moment.locale(),{week:{dow:1}})
    const [now, setNow] = useState(moment())
    const [months, setMonths] = useState(now.month())
    const [year, setYear] = useState(now.year())

    const now_for_lastday = now.clone()
    const now_for_startday = now.clone()

    const lastday = now_for_lastday.endOf('month').endOf('week')
    const startday = now_for_startday.startOf('month').startOf('week')
    let day = startday.clone()

    const calendar = []
    const value_of_calendar = []

    while (!day.isAfter(lastday)) {
        calendar.push(day.date())
        value_of_calendar.push(day.format('YYYY-MM-DD'))
        day.add(1,'day')
    }

    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']

    const dispatch = useDispatch()
    useEffect ( () => {
        dispatch(getAllEventByCalendar(2))
    }, [dispatch])
    let AllEvents = []
    AllEvents = event.events
    if (AllEvents === undefined) {
        AllEvents = []
    }
    console.log(AllEvents);
    return (
        <>
            <div>
                <p>
                    <button onClick={ () => {
                        setNow(now.subtract(1,'month'))
                        setYear(now.year())
                        setMonths(now.month())
                    }}>
                        Prev
                    </button>
                    {month[months] +year} 
                    <button onClick={ () => {
                        setNow(now.add(1,'month'))
                        setYear(now.year())
                        setMonths(now.month())
                    }}>
                        Next
                    </button> 
                </p>
                    <ul>
                        {calendar.map( (call,index) => {
                            // <li value = {value_of_calendar[index]} key={index}>{call}
                            //     {AllEvents.map(event => {
                            //         if (event.time.substring(0,10) === value_of_calendar[index]) {
                            //             return (<ul key={event.id}><li>{event.title}</li></ul>)
                            //         }
                            //     })}
                            // </li>
                            
                            return(<li value = {value_of_calendar[index]} key={index}>{call}
                                {AllEvents.map(event => {
                                    if (event.time.substring(0,10) === value_of_calendar[index]) {
                                        return (<ul key={event.id}><li>{event.title}</li></ul>)
                                    }
                                })}
                            </li>)
                        })}
                    </ul>
            </div>  
        </>
    )
}

export default HomePage;