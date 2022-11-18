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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect } from 'react';


const EventForm = ({ date, calendar_id, setVisible }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#4169e1');
    const [time, setTime] = useState('00:00');
    const [errorMessage, setMessage] = useState('');
    const [categories, setCatigories] = useState(['arrangement', 'reminder', 'task']);
    const [category, setCategory] = useState('');

    let exactTime = moment(time.valueOf()).format('HH:mm')
    const dispatch = useDispatch()
    const sendReq = (e) => {
        e.preventDefault();
        if (title != '', description != '', exactTime, color != '', category != '') {
            const exactDate = date + ' ' + exactTime
            console.log(exactDate);
            dispatch(CreateEvent(title, description, category, color, exactDate, calendar_id))
            setDescription('');
            setTitle('');
            setColor('');
            setCategory('');
            setMessage('');
            setTime('00:00');
            setVisible(false);
        }
        else{
            setMessage("Fill all fields");
            setTimeout(() => setMessage(""), 2000)
        }

    }
    const handleChangeComplete = (color, event) => {
        setColor(color.hex);
    };
    useEffect(() => {
            setTitle('')
            setDescription('')
            setColor("#4169e1")
            setCategory('')
            setTime('00:00')
    }, [date])
    return (
        <form>
            <h1>Create Event</h1>
            <MyInput
                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder="Event title"
            />
            <MyInput
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="text"
                placeholder="Event description"
            />
            <MySelect
                value={category}
                defaultValue={"Choose category"}
                options={categories.map(el => {
                    return { value: el, name: el }
                })}
                onChange={selectedCategory => setCategory(selectedCategory)}
            />
            <MyInput
                value={color}
                onChange={e => setColor(e.target.value)}
                type="text"
                placeholder="Event color"
                disabled={true}
            />
            <ChromePicker
                color={color}
                onChangeComplete={handleChangeComplete}
            />
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                    <TimePicker
                        ampm={false}
                        minutesStep={5}
                        value={time}
                        onChange={setTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
            <h2 style={{color: "red"}}>{errorMessage}</h2>
            <MyButton onClick={(e) => sendReq(e)}>{"Create Event"} <AddCircleOutlineIcon /></MyButton>
        </form>
    )
}

export default EventForm;



