import { CalendarById, SharingCalendar, SubmitSharing } from "../api/CalendarApi";


export const getCalendarsById = (user_id) => async(dispatch) => {
    try {
        const {data} = await CalendarById(user_id);
        return dispatch({type:'getCalendarById', payload:data.result})
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