import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../UI/button/MyButton'
import MyInput from '../UI/input/MyInput'
import MySelect from '../UI/select/MySelect';
import moment from 'moment';
import { SketchPicker, ChromePicker } from 'react-color';
import { CreateEvent } from '../../action/EventAction';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


const EventView= ({ date, calendar_id, body, setVisible }) => {
    const [title, setTitle] = useState(body.title);
    const [description, setDescription] = useState(body.description);
    const [color, setColor] = useState(body.color);
    const [time, setTime] = useState(body.time.split('T')[1].split('.')[0]);
    const [errorMessage, setMessage] = useState ('');
    const [categories, setCatigories] = useState(['arrangement', 'reminder', 'task']);
    const [category, setCatigory] = useState(body.type);

    let exactTime = moment(time.valueOf()).format('HH:mm')
    const dispatch = useDispatch()
    const sendReq = (e) => {
        e.preventDefault();
        console.log("aboba")
    }
    const handleChangeComplete = (color, event) => {
        setColor(color.hex);
    };
    return (
        <form>
            <h1>Event</h1>
            <MyInput
                value={"author: " +body.author_id}
                type="text"
                placeholder="Event title"
                disabled={true}
            />
            <MyInput
                value={title}
                type="text"
                placeholder="Event title"
                disabled={true}
            />
            <MyInput
                value={description}
                type="text"
                placeholder="Event description"
                disabled={true}
            />
            <MyInput
                value={category}
                type="text"
                placeholder="Event description"
                disabled={true}
            />
            <MyInput
                value={color}
                type="text"
                placeholder="Event color"
                disabled={true}
            />
            <MyInput
                value={time}
                type="text"
                placeholder="Event color"
                disabled={true}
            />
            <br></br>
            <h2>{errorMessage}</h2>
            <MyButton onClick={(e) => sendReq(e)}>{"Edit Event"}</MyButton>
            <MyButton style={{marginRight: 5}} onClick={(e) => sendReq(e)}>{"Delete"}</MyButton>
        </form>
    )
}

export default EventView;



