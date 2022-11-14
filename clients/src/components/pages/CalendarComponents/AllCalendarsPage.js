import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarsById } from "../../../action/CalendarAction";
import jwt_decode from 'jwt-decode'
import { useHistory } from "react-router-dom";

const AllCalendarsPage = () => {
    const Calendars = useSelector(state => state.Calendar)
    const auth = useSelector(state=>state.Auth)
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
                    return(<p key={calendars.id} onClick ={ () => {
                        history.push(`/calendar/${calendars.id}`)
                    }}>{calendars.title.toString()}</p>)
                })}   
            </>
        )
    }
}

export default AllCalendarsPage