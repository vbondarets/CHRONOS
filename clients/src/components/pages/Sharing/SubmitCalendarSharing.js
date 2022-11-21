import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SubmitSharingCalendarAction } from "../../../action/CalendarAction";

const SubmitSharingCalendar = () => {
    const {token} = useParams()
    const CalendarStore = useSelector(store => store.Calendar)
    const dispatch = useDispatch()
    useEffect ( () => {
        dispatch(SubmitSharingCalendarAction(token))
    }, [dispatch])
    let calendarMessage = CalendarStore.submitSharingCalendar
    if (calendarMessage === 'All okay') {
        return (
            <>
                You submit sharing
            </>
        )
    }
    else {
        return (
            
            <>Something went Wrong</>
        )
    }
}


export default SubmitSharingCalendar