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
    const [time_end, setTime_end] = useState(moment())
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
    const exact_date = date.format('YYYY-MM-DD')
    const exact_time = time.format('HH:mm')
    const exact_time_end = time_end.format('HH:mm')
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
                        dispatch(CreateEvent(title, description, type, color, exact, end_exact, calendar_id))
                        setTitle('')
                        setDescription('')
                        setType('')
                        setColor('')
                        setTime(moment())
                        setDate(moment())
                    }
                    else {
                        const exact= `${exact_date} ${exact_time}:00`
                        const end_exact = `${exact_date} ${time.add(5,'minute').format('HH:mm')}:00`
                        dispatch(CreateEvent(title, description, type, color, exact, end_exact, calendar_id))
                        setTitle('')
                        setDescription('')
                        setType('')
                        setColor('')
                        setTime(moment())
                        setDate(moment())
                    }
                }
                }>Create Event</button>
            </div>
        </div>
    )
}

export default Create_Page