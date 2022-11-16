import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewestEventsByUser_id } from "../../action/EventAction";
import jwt_decode from 'jwt-decode'

const HomePage = () => {
    const eventsStore = useSelector(store => store.Event)
    const auth = useSelector(state=>state.Auth)
    const tokenn = auth.token
    let user_id, decode
    if (tokenn === '') {
        
    }
    else {
        decode = jwt_decode(tokenn)
        user_id = decode.id
    }

    const dispatch = useDispatch()
    useEffect ( () => {
        dispatch( getNewestEventsByUser_id(user_id) )
    }, [dispatch])
    let LatestEvents = eventsStore.latestEvents
    console.log(LatestEvents);
    if (LatestEvents === undefined) {
        LatestEvents = []
        return (
            <>
                You Havent Events Yet
            </>
        )
    } 
    else {
        return (
            <div>
                {LatestEvents.map( events => {
                    return(<p key={events.id}>{events.title}</p>)
                })}
            </div>
        )
    }
}

export default HomePage;