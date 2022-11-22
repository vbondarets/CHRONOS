import { createevent, deleteEvent, getEventId, getEvents, getLatestEvents, shareEvent, Submit, updateEvent } from "../api/EventApi";

export const getAllEventByCalendar = (calendar_id) => async(dispatch) => {
    try {
        const {data} = await getEvents(calendar_id)
        console.log(data);
        return dispatch({type:'getEvets', payload:data.result})
    } catch (error) {
        console.log(error);
    }
}

export const UpdateEvent = (calendar_id, event_id, title, description, type, color, start_At ,end_At) => async(dispatch) => {
    try {
        const {data} = await updateEvent(calendar_id, event_id, title, description, type, color, start_At ,end_At)
        if (data.result.affectedRows > 0) {
            const Data = await getEvents(calendar_id)
            return dispatch({type:'updateEvent', payload: Data.data.result})
        }
    } catch (error) {
        
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

export const SortByType = (calendar_id, category) => async(dispatch) => {
    try {
        const {data} = await getEvents(calendar_id)
        console.log(calendar_id);
        console.log(category);
        const sorted = []
        const events = data.result
        if (category === 'all') {
            return dispatch({type:'sortbyType', payload:events})    
        }
        else {
            events.map ((ev, indx) => {
                if (ev.type === category) {
                    sorted.push(events[indx])
                }
            })
            console.log(sorted);
            return dispatch({type:'sortbyType', payload:sorted})
        }
    } catch (error) {
        console.log(error);
    }
}

export const ShareEvent = (event_id, user_id, calendar_id) => async(dispatch) => {
    try {
        const {data} = await shareEvent(event_id, user_id)
        if (data.message === "Confiramtion was sent") {
            const Data = await getEvents(calendar_id)
            return dispatch({type:'shareEvent', payload: Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}

export const SubmitSharingEvent = (token, calendar_id) => async(dispatch) => {
    try {
        const {data} = await Submit(token, calendar_id)
        if (data.result.affectedRows > 0) {
            const Data = await getEvents(calendar_id)
            return dispatch({type:'submitSharingEvent', payload: Data.data.result})
        } 
    } catch (error) {
        console.log(error);
    }
}

export const DeleteEvent = (event_id, calendar_id) => async(dispatch) => {
    try {
        const {data} = await deleteEvent(calendar_id, event_id) 
        if (data.message === 'Event was deleted') {
            const Data = await getEvents(calendar_id)
            return dispatch({type:'deleteEvent', payload:Data.data.result})
        }
    } catch (error) {
        console.log(error);
    }
}