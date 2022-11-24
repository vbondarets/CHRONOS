import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUserCalendar, getCalendarsById, HideCalendar } from "../../../action/CalendarAction";
import jwt_decode from 'jwt-decode'
import { useHistory } from "react-router-dom";
import CreateCalendarModal from '../../UI/MyModal/CreateCalendarModal'
import ShareCalendarForm from "../../forms/ShareCalendarFrom";
import ShareCalendarModal from "../../UI/MyModal/ShareCalendarModal";
import CreateCalendarForm from "../../forms/CreateCalendarForm";
import style from '../../style/CalendarsPage.module.css'
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditCalendarForm from "../../forms/EditForm";
import EventModal from "../../UI/MyModal/ModalForEvent";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Alert} from 'react-bootstrap'
import CloseIcon from '@mui/icons-material/Close';
import { Fade } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const AllCalendarsPage = () => {
    const Calendars = useSelector(state => state.Calendar)
    const auth = useSelector(state=>state.Auth)
    const [calendarid, setCalendar_id] = useState()
    const [edit, setEdit] = useState(false)
    const [currentCalendar, setCurrent] = useState('')
    const [show, setShow] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    //check user_id
    const tokenn = auth.token
    let decode, user_id,login
    decode = jwt_decode(tokenn)
    user_id = decode.id
    login = decode.login

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect ( () => {
        dispatch(getCalendarsById(user_id))
    }, [dispatch])

    const shareButton = (e) => {
        setVisible(true)
    }
    if(show) {
        setTimeout(()=>{setShow(false)},4000)
    }
    if(showDelete) {
        setTimeout(()=> {setShowDelete(false)},4000)
    }
    const [visible, setVisible] = useState(false)
    const [vis, setVis] = useState(false)
    let AllCalendars = Calendars.AllCalendarsById
    if (Calendars.AllCalendarsById === []) {
        AllCalendars = []
    }
    if (tokenn === '') {
        return (<>Please login</>)
    }
    else {
        return (
            <>
            <Alert show ={show} variant='success' transition={Fade}>
                <div style={{zIndex:'999', width:"100%", display:'flex', position:'fixed', top:'0'}}>
                    <div style = {{borderRadius:'20px',display:'flex', alignItems:'center',backgroundColor:'#ffff00', margin:'auto', width:'30%', padding:'20px'}}>
                        <div style={{marginLeft:'10%',}}>
                            <VisibilityOffIcon />
                        </div>
                        <div style={{marginLeft:'10%'}}>
                            <p><strong>Be careful!</strong></p>
                            <p>This calendar was hidden</p>
                        </div>
                    </div>
                </div>
            </Alert>
            <Alert show ={showDelete} variant='success' transition={Fade}>
                <div style={{zIndex:'999', width:"100%", display:'flex', position:'fixed', top:'0'}}>
                    <div style = {{borderRadius:'20px',display:'flex', color:'white',alignItems:'center',backgroundColor:'red', margin:'auto', width:'30%', padding:'20px'}}>
                        <div style={{marginLeft:'10%',}}>
                            <DeleteForeverIcon />
                        </div>
                        <div style={{marginLeft:'10%'}}>
                            <p><strong>Be careful!</strong></p>
                            <p>This calendar was delete!</p>
                        </div>
                    </div>
                </div>
            </Alert>
            <CreateCalendarModal visible={vis} setVisible ={setVis}>
                <CreateCalendarForm user_id={user_id}/>
            </CreateCalendarModal>
            <EventModal visible={edit} setVisible={setEdit}>
                <EditCalendarForm user_id={user_id} 
                    calendar_id={currentCalendar.calendar_id} 
                    title={currentCalendar.title} 
                    description={currentCalendar.description} 
                />
            </EventModal>
                <button className={style.createButton} onClick={ () => setVis(true)}>Create Calendar  <AddIcon /></button>
                <div className={style.Container} >
                    {AllCalendars.map( (calendars, index) => {
                        return(
                        <>
                            <ShareCalendarModal visible={visible} setVisible = {setVisible} key={calendars.id + "_modal"}>
                                <ShareCalendarForm calendar_id={calendarid} />
                            </ShareCalendarModal>
                            <div className={style.Content} key={calendars.id}>
                                <div className={style.Calendar}>
                                    <p onClick={ () => history.push(`/calendar/${calendars.id}`)}>Title: {calendars.title}</p>
                                    <p>Description: {calendars.description}</p>
                                    {calendars.author_id === user_id ? 
                                    <>
                                        {calendars.title === `${login} Calendar` || calendars.title === `National Calendar ${login}` ? 
                                        <>
                                        
                                        </>
                                        :
                                        <>
                                            <button className={style.shareButton} onClick={ (e) => {
                                                setCalendar_id(calendars.id)
                                                setVisible(true)
                                                }}>Share <ShareIcon />
                                            </button>
                                            <button className={style.shareButton} onClick = { () => {
                                                setCurrent(AllCalendars[index])
                                                setEdit(true)
                                            }}>Edit <EditIcon /></button>
                                            <button className={style.deleteButton} onClick = { () => {
                                                setShow(true)
                                                dispatch(HideCalendar(calendars.calendar_id, user_id))
                                            }}>
                                                Hide <VisibilityOffIcon />
                                            </button>
                                            <button className={style.deleteButton} onClick={ () => {
                                                setShowDelete(true)
                                                dispatch(DeleteUserCalendar(user_id, calendars.id))
                                            }}>Delete <DeleteIcon /></button>
                                        </>
                                        }
                                    </> 
                                    : 
                                    <>
                                        <button className={style.deleteButton} onClick={ () => {
                                            setShowDelete(true)
                                            dispatch(DeleteUserCalendar(user_id, calendars.id))
                                        }}>Delete <DeleteIcon /></button>
                                    </>
                                    }
                                </div>
                            </div>
                        </>
                        )
                    })}
                </div>   
            </>
        )
    }
}

export default AllCalendarsPage