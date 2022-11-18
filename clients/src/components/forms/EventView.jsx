import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getEventById } from '../../action/EventAction';
import moment from 'moment';


const EventView= ({ event }) => {
    if (event === undefined) {
        event = []
    }
    else {
        console.log(event);
        return (
            <form>
                <h1>Event</h1>
                <p>Author: {event.user_id}</p>    
                <p>Title: {event.title}</p>  
                <p>Description: {event.description}</p>
                <p>Type: {event.type}</p>
                <p>Date: {moment(event.time).format('YYYY-MM-DD')}</p>
                <p>Time: {moment(event.time).format('HH:mm')}</p>
            </form>
        )
    }
}

export default EventView;



