import React, { useState } from "react"
import { ChromePicker } from "react-color"
import { useDispatch } from "react-redux"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import moment from "moment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { CreateEvent } from "../../../action/EventAction";
import { useParams } from "react-router-dom";
import style from '../../style/CreateEventPage.module.css'

const Create_Page = () => {
    const {calendar_id} = useParams()

    const [title, setTitle] = useState()
    const [color, setColor] = useState()
    const [description, setDescription] = useState()
    const [type, setType] = useState('')
    const [time, setTime] = useState(moment())
    const [date, setDate] = useState(moment())
    const handleChangeComplete = (color, event) => {
        setColor(color.hex);
    };
    const handleChange = (newValue: Dayjs | null) => {
        setDate(newValue);
    };
    const handleChangeOfTime = (newValue: Dayjs | null) => {
        setTime(newValue);
    };
    const exact_date = date.format('YYYY-MM-DD')
    const exact_time = time.format('HH:mm')
    console.log(`${exact_date} ${exact_time}`);
    const dispatch = useDispatch()
    return ( 
        <div className={style.Container}>
            <div className={style.Content}>
                <h1>Create Event</h1>
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
                    <TimePicker
                        label= 'Select time'
                        ampm={false}
                        minutesStep={5}
                        value={time}
                        onChange={handleChangeOfTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <br></br>
                <button onClick={ () => 
                    {const exact= `${exact_date} ${exact_time}:00`
                    console.log(exact);
                    dispatch(CreateEvent(title, description, type, color, exact, calendar_id))
                    setTitle('')
                    setDescription('')
                    setType('')
                    setColor('')
                    setTime(moment())
                    setDate(moment())
                }
                }>Create Event</button>
            </div>
        </div>
    )
}

export default Create_Page