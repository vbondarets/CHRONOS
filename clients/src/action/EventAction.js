<<<<<<< HEAD
import { createevent, getEventId, getEvents, getLatestEvents, updateEvent } from "../api/EventApi";
=======
import { createevent, getEventId, getEvents, getLatestEvents, shareEvent } from "../api/EventApi";
>>>>>>> 800ecb92e83b8cf2277f61c65507f7f5292d7afd

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
<<<<<<< HEAD
export const UpdateEvent = (calendar_id, event_id, body) => async(dispatch) => {
    try {
        const {data} = await updateEvent(calendar_id, event_id, body)
        if (data.message === "event was updated") {
            const Data = await getEvents(calendar_id)
            return dispatch({type:'updateEvent', payload: Data.data.result})
=======

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
>>>>>>> 800ecb92e83b8cf2277f61c65507f7f5292d7afd
        }
    } catch (error) {
        console.log(error);
    }
}