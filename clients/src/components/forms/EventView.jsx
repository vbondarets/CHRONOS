import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import moment from 'moment';
import jwt_decode from 'jwt-decode'
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const EventView= ({ event }) => {
    const auth = useSelector(state=>state.Auth)
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
        console.log(event);
        return (
            <form>
                <h1 style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>Event {event.user_id === user_id ? <div><ShareIcon /> <DeleteIcon /> <EditIcon /></div> : <></>}</h1>
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
        )
    }
}

export default EventView;



