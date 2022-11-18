<<<<<<< HEAD
import { createevent, getEventId, getEvents, getLatestEvents } from "../api/EventApi";
=======
import { createevent, deleteEvent, getEvents, getLatestEvents } from "../api/EventApi";
>>>>>>> 1fb237cac1973029580de7563eea952e2bf8f903

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

export const CreateEvent = (title, description, type, color, time, calendar_id) => async(dispatch) => {
    try {
        const {data} = await createevent(title, description, type, color, time, calendar_id)
        if (data.result.affectedRows > 0) {
            const Data = await getEvents(calendar_id)
            return dispatch({type:'createEvent', payload: Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}
export const DeleteEvent = (calendar_id, event_id) => async(dispatch) => {
    try {
        const {data} = await deleteEvent(calendar_id, event_id)
        console.log(data)
        if (data.message === "Event was deleted") {
            
            const {data} = await getEvents(calendar_id)
            return dispatch({type:'createEvent', payload: data.result})
        }
    } catch (error) {
        console.log(error);
    }
}