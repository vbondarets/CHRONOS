import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewestEventsByUser_id } from "../../action/EventAction";
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import style from '../style/HomePage.module.css'

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
            <div className={style.Container}>
                <div style={{width:'30%'}}>
                <h1 className={style.h1OFHomePage}>Your upcoming events</h1>
                {LatestEvents.map( events => {
                    return(
                        <div className={style.Event}> 
                            <p><b>Title:</b> {events.title}</p>
                            <p><b>Description:</b> {events.description}</p>
                            <p><b>Type:</b> {events.type}</p>
                            <p><b>Date:</b> {moment(events.start_At).format(`DD`)} {moment(events.start_At).format('MMMM')} {moment(events.start_At).format('YYYY')}</p>
                            {events.type === 'arrangement' ? 
                            <>
                                <p><b>Event start at - </b>{moment(events.start_At).format('HH:mm')}</p>
                                <p><b>Event end at - </b>{moment(events.end_At).format('HH:mm')}</p>
                            </> 
                            : 
                            <>
                                {events.type === 'task' ? <></> : <p><b>Remind at -</b> {moment(events.end_At).format('HH:mm')}</p>}
                            </>
                            }
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default HomePage;