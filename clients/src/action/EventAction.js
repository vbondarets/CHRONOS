import { getEvents } from "../api/EventApi";

export const getAllEventByCalendar = (calendar_id) => async(dispatch) => {
    try {
        const {data} = await getEvents(calendar_id)
        console.log(data);
        return dispatch({type:'getEvets', payload:data.result})
    } catch (error) {
        console.log(error);
    }
}