import { useHistory } from "react-router-dom";
import { CalendarById, createCalendar, deleteAccess, deleteCalendar, getAllCalendar, getAllUsers, getAuthor, hideCalendar, importcalendar, SharingCalendar, SubmitSharing, updateCalendar } from "../api/CalendarApi";

export const AllCalendars = () => async(dispatch) => {
    try {
        const {data} = await getAllCalendar()
        if (data.result.length > 0) {
            return dispatch({type:'getAllCalendar', payload:data.result})
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAuthorOfCalendar = (calendar_id) => async(dispatch) => {
    try {
        const {data} = await getAuthor(calendar_id)
        return dispatch({type:'getAuthor', payload:data.result[0].author_id})
    } catch (error) {
        console.log(error);
    }
}

export const GetAllUsersOnCalendar = (calendar_id) => async(dispatch) => {
    try {
        const {data} = await getAllUsers(calendar_id)
        return dispatch({type:'getUsersOnCalendar', payload:data.result})
    } catch (error) {
        console.log(error);
    }
}

export const getCalendarsById = (user_id) => async(dispatch) => {
    try {
        const {data} = await CalendarById(user_id);
        return dispatch({type:'getCalendarById', payload:data.result})
    } catch (error) {
        console.log(error);
    }
}

export const ImportCalendar = (calendar_id, user_id) => async(dispatch) => {
    try {
        const {data} = await importcalendar(calendar_id)
        if (data.result.affectedRows > 0) {
            const Data = await CalendarById(user_id)
            return dispatch({type:'importCalendar', payload:Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}

export const UpdateCalendar = (user_id, calendar_id, title, description, setVisible) => async(dispatch) => {
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

export const DeleteAccessToCalendar = (user_id, calendar_id) => async(dispatch) => {
    try {
        const {data} = await deleteAccess(user_id, calendar_id)
        if (data.result.affectedRows > 0) {
            const Data = await getAllUsers(calendar_id)
            return dispatch({type:'deleteUser', payload:Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}

export const HideCalendar = (calendar_id, user_id) => async(dispatch) => {
    try {
        const {data} = await hideCalendar(calendar_id)
        if (data.result.affectedRows > 0) {
            const Data = await CalendarById(user_id)
            return dispatch({type:'hideCalendar', payload:Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}

export const createCalendarByUser = (title, user_id, description, color) => async(dispatch) => {
    try {
        const {data} = await createCalendar(title, description, color)
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