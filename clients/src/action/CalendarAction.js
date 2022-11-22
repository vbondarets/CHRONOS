import { useHistory } from "react-router-dom";
import { CalendarById, createCalendar, deleteCalendar, SharingCalendar, SubmitSharing, updateCalendar } from "../api/CalendarApi";

export const getCalendarsById = (user_id) => async(dispatch) => {
    try {
        const {data} = await CalendarById(user_id);
        return dispatch({type:'getCalendarById', payload:data.result})
    } catch (error) {
        console.log(error);
    }
}

export const UpdateCalendar = (user_id, calendar_id, title, description) => async(dispatch) => {
    try {
        const {data} = await updateCalendar(calendar_id,title, description)
        if (data.result.affectedRows > 0) {
            const Data = await CalendarById(user_id);
            return dispatch({type:'updateCalendar', payload:Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}

export const SubmitSharingCalendarAction = (token) => async(dispatch) => {
    try {
        const {data} = await SubmitSharing(token)
        if (data.result.affectedRows > 0) {
            return dispatch({type:'submitSharingCalendar', payload:'All okay'})
        }
    } catch (error) {
        console.log(error);
    }
}

export const ShareCalendar = (calendar_id, user_id) => async(dispatch) => {
    try {
        const {data} = await SharingCalendar(user_id, calendar_id)
        if (data.message === 'Email was sent') {
            return dispatch({type:'shareCalendar', payload:data.message})
        }
    } catch (error) {
        console.log(error);
    }
} 

export const DeleteUserCalendar = (user_id, calendar_id) => async(dispatch) => {
    try {
        const {data} = await deleteCalendar(user_id, calendar_id)
        if (data.result.affectedRows > 0) {
            const Data = await CalendarById(user_id)
            return dispatch({type:'deleteCalendar', payload:Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}


export const createCalendarByUser = (title, user_id, description) => async(dispatch) => {
    try {
        const {data} = await createCalendar(title, description)
        if (data.result.affectedRows > 0) {
            try {
                const Data = await CalendarById(user_id);
                return dispatch({type:'createCalendar', payload: Data.data.result})
            } catch (error) {
                console.log(error);
            }
        } 
    } catch (error) {
        console.log(error);
    }
}