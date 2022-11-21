import { createevent, getEventId, getEvents, getLatestEvents, updateEvent } from "../api/EventApi";

export const getAllEventByCalendar = (calendar_id) => async(dispatch) => {
    try {
        const {data} = await getEvents(calendar_id)
        console.log(data);
        return dispatch({type:'getEvets', payload:data.result})
    } catch (error) {
        console.log(error);
    }
}
export const getEventById = (event_id) => async(dispatch) => {
    try {
       const {data} = await getEventId(event_id)
       console.log(data);
       return dispatch({type:'getEventById', payload: data.result}) 
    } catch (error) {
        console.log(error);
    }
}
export const getNewestEventsByUser_id = (user_id) => async(dispatch)=> {
    try {
        const {data} = await getLatestEvents(user_id)
        return dispatch({type:'getLatestEvents', payload:data.result})
    } catch (error) {
        console.log(error);
    }
}

export const CreateEvent = (title, description, type, color, start_at, end_at, calendar_id) => async(dispatch) => {
    try {
        const {data} = await createevent(title, description, type, color, start_at, end_at, calendar_id)
        if (data.result.affectedRows > 0) {
            const Data = await getEvents(calendar_id)
            return dispatch({type:'createEvent', payload: Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}
export const UpdateEvent = (calendar_id, event_id, body) => async(dispatch) => {
    try {
        const {data} = await updateEvent(calendar_id, event_id, body)
        if (data.message === "event was updated") {
            const Data = await getEvents(calendar_id)
            return dispatch({type:'updateEvent', payload: Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}