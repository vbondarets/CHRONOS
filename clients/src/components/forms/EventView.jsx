import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import jwt_decode from 'jwt-decode'
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MyModal from '../UI/MyModal/MyModal';
import ShareCalendarModal from '../UI/MyModal/ShareCalendarModal';
import ShareEventForm from './ShareEventForm';
import { DeleteEvent, UpdateEvent } from '../../action/EventAction';
import style from '../style/ButtonOfEventView.module.css'
import { ChromePicker } from "react-color"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


const EventView= ({ event, calendar_id, setVisiblity }) => {
    const auth = useSelector(state=>state.Auth)
    const [visible, setVisible] = useState(false)
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState()
    const [color, setColor] = useState()
    const [description, setDescription] = useState()
    const [type, setType] = useState('')
    const [time, setTime] = useState(moment())
    const [date, setDate] = useState(moment())
    const [time_end, setTime_end] = useState(moment())

    const exact_date = date.format('YYYY-MM-DD')
    const exact_time = time.format('HH:mm')
    const exact_time_end = time_end.format('HH:mm')
    const handleChangeComplete = (color, event) => {
        setColor(color.hex);
    };
    const handleChange = (newValue: Dayjs | null) => {
        setDate(newValue);
    };
    const handleChangeOfTime = (newValue: Dayjs | null) => {
        setTime(newValue);
    };
    const handleChangeOfTime_End = (newValue: Dayjs | null) => {
        setTime_end(newValue);
    };
    const dispatch = useDispatch()
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
                    <ShareEventForm event_id={event.event_id} calendar_id={calendar_id} setVisiblity={setVisiblity} />
                </ShareCalendarModal>
                <form>
                    <h1 style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>Event {event.author_id === user_id ? 
                        <div><ShareIcon className={style.ShareIcon} onClick = {() => setVisible(true)} /> <DeleteIcon className={style.DeleteIcon} onClick ={() => {
                            dispatch(DeleteEvent(event.event_id, calendar_id))
                        }} /> <EditIcon className={style.EditIcon} onClick ={ () => {
                            setEdit(true)
                        }}/></div> : 
                        <>
                            {event.user_id === user_id ? <DeleteIcon onClick = { () => {
                                dispatch(DeleteEvent(event.event_id, calendar_id))
                                setVisiblity(false)
                            }} className={style.DeleteIcon}/> : <></>}
                        </>
                    }
                    </h1>
                    {edit === true ? 
                        <div>
                            <input 
                                placeholder="Enter title of event" 
                                name='title' type='text' value={title}
                                onChange = { e => setTitle(e.target.value)}    
                            >        
                            </input>
                            <br></br>
                            <input 
                                placeholder="Enter description of event" 
                                name='description' type='text' value={description}
                                onChange = { e => setDescription(e.target.value)}    
                            >        
                            </input>
                            <br></br>
                            <select value = {type} onChange ={ e => setType(e.target.value)}>
                                <option disabled={true} value=''>Choose type of event</option>
                                <option value='arrangement'>Arrangement</option>
                                <option value='task'>Task</option>
                                <option value='reminder'>Reminder</option>
                            </select>
                            <ChromePicker
                                color = {color}
                                onChangeComplete={ handleChangeComplete }
                            />
                            <br></br>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Select date"
                                    inputFormat="YYYY-MM-DD"
                                    value={date}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <br></br>
                                <br></br>
                                {type === 'arrangement' ? 
                                <>
                                    <TimePicker
                                        label= 'Select time'
                                        ampm={false}
                                        minutesStep={5}
                                        value={time}
                                        onChange={handleChangeOfTime}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <TimePicker
                                        label= 'Select time'
                                        ampm={false}
                                        minutesStep={5}
                                        value={time_end}
                                        onChange={handleChangeOfTime_End}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </> 
                                : 
                                <>
                                    <TimePicker
                                        label= 'Select time'
                                        ampm={false}
                                        minutesStep={5}
                                        value={time}
                                        onChange={handleChangeOfTime}
                                        renderInput={(params) => <TextField {...params} />}
                                    /> 
                                </>
                                }
                            </LocalizationProvider>
                            <br></br>
                            <button onClick={ () => {
                                if (type === 'arrangement') {
                                    const exact= `${exact_date} ${exact_time}:00`
                                    const end_exact = `${exact_date} ${exact_time_end}:00`
                                    console.log(exact);
                                    console.log(end_exact);
                                    dispatch(UpdateEvent(calendar_id, event.event_id, title, description, type, color, exact, end_exact))                                    
                                    setTitle('')
                                    setDescription('')
                                    setType('')
                                    setColor('')
                                    setTime(moment())
                                    setDate(moment())
                                    setVisible(false)
                                    setVisiblity(false)
                                }
                                else {
                                    const exact= `${exact_date} ${exact_time}:00`
                                    const end_exact = `${exact_date} ${time.add(5,'minute').format('HH:mm')}:00`
                                    dispatch(UpdateEvent(calendar_id, event.event_id, title, description, type, color, exact, end_exact))
                                    setTitle('')
                                    setDescription('')
                                    setType('')
                                    setColor('')
                                    setTime(moment())
                                    setDate(moment())
                                    setVisible(false)
                                    setVisiblity(false)
                                }
                            }
                            }>Update Event</button>
                        </div>
                        :
                        <>
                            <p>Author: {event.author_id}</p>    
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
                                    {event.type === 'reminder' ? <p>Time: {moment(event.start_At).format('HH:mm')}</p> : <></>}
                                </>
                            }
                        </>
                    }
                </form>
            </div>
        )
    }
}

export default EventView;



