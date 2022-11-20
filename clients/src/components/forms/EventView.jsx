import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import moment from 'moment';
import jwt_decode from 'jwt-decode'
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MyModal from '../UI/MyModal/MyModal';
import ShareCalendarModal from '../UI/MyModal/ShareCalendarModal';
import ShareEventForm from './ShareEventForm';


const EventView= ({ event,calendar_id }) => {
    const auth = useSelector(state=>state.Auth)
    const [visible, setVisible] = useState(false)
    const tokenn = auth.token
    let user_id, decode
    if (tokenn === '') {
        
    }
    else {
        decode = jwt_decode(tokenn)
        user_id = decode.id
    }

    if (event === undefined) {
        event = []
    }
    else {
        return (
            <div>
                <ShareCalendarModal visible={visible} setVisible = {setVisible}>
                    <ShareEventForm event_id={event.event_id} calendar_id={calendar_id} />
                </ShareCalendarModal>
                <form>
                    <h1 style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>Event {event.user_id === user_id ? <div><ShareIcon onClick = {() => setVisible(true)} /> <DeleteIcon /> <EditIcon /></div> : <></>}</h1>
                    <p>Author: {event.user_id}</p>    
                    <p>Title: {event.title}</p>  
                    <p>Description: {event.description}</p>
                    <p>Type: {event.type}</p>
                    <p>Date: {moment(event.start_At).format('YYYY-MM-DD')}</p>
                    {event.type === 'arrangement' ? 
                    <>
                        <p>Started: {moment(event.start_At).format('HH:mm')}</p>
                        <p>Finished: {moment(event.end_At).format('HH:mm')}</p>
                    </> 
                    : 
                    <>
                        <p>Time: {moment(event.start_At).format('HH:mm')}</p>
                    </>}
                </form>
            </div>
        )
    }
}

export default EventView;



