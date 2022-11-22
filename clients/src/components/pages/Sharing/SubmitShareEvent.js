import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux";
import { getCalendarsById } from "../../../action/CalendarAction";
import { SubmitSharingEvent } from "../../../action/EventAction";


const SubmitShareEventPage = () => {
    const {token} = useParams()
    const [calendar_name, setCalendarName] = useState('') 
    const [message, setMessage] = useState(false)
    const decode = jwt_decode(token)
    const user_id = decode.direction_id
    const CalendarStore = useSelector(store => store.Calendar)

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect( () => {
        dispatch(getCalendarsById(user_id))
    }, [dispatch])
    let calendars = CalendarStore.AllCalendarsById
    console.log(calendars);
    console.log(calendar_name);
    if (calendars === undefined) {
        calendars = []
    }
    else {
        return (
            <div>
                <p>User with id - {decode.author_id} share with you event</p>
                <div>
                    <h2>Select calendar to paste event</h2>
                    <div>
                        <select value={calendar_name} onChange = { e => setCalendarName(e.target.value)}>
                            <option disabled={true} value=''>Choose calendar</option>
                            {calendars.map ( calendar => {
                                return (
                                    <option value={calendar.id} key={calendar.id}>
                                        {calendar.title}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <button onClick={ () => {
                        if (calendar_name != '') {
                            dispatch(SubmitSharingEvent(token, calendar_name))
                            history.push(`/calendar/${calendar_name}`)
                        }
                        else {
                            setMessage(true)
                        }
                    }}>Share to {calendar_name} calendar</button>
                    {message === true ? <p style={{color:'red', fontSize:'15px'}}>Chose Calendar bro</p> : <></>}
                </div>
            </div>
        )
    }
}

export default SubmitShareEventPage