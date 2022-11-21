import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import jwt_decode from 'jwt-decode'
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { SketchPicker, ChromePicker } from 'react-color';
import { CreateEvent, DeleteEvent, UpdateEvent } from '../../action/EventAction';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { deleteEvent } from '../../api/EventApi';
import MyInput from '../UI/input/MyInput';
import MySelect from '../UI/select/MySelect';
import MyButton from '../UI/button/MyButton';


const EventView = ({ event, setVisible, calendar_id }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [titleEdit, setTitleEdit] = useState();
    const [descriptionEdit, setDescriptionEdit] = useState();
    const [colorEdit, setColorEdit] = useState();
    // const [timeEdit, setTimeEdit] = useState("");
    const [timeStartEdit, setStartTimeEdit] = useState("00:00");
    const [timeEndEdit, setEndTimeEdit] = useState("00:00");
    const [errorMessage, setMessage] = useState('');
    const [categoryEdit, setCategoryEdit] = useState('');
    const [categories, setCatigories] = useState(['arrangement', 'reminder', 'task']);

    const auth = useSelector(state => state.Auth)
    const tokenn = auth.token
    let user_id, decode;
    const dispatch = useDispatch()
    useEffect(() => {
        //
        setIsEdit(false)
        if (event.type) {
            setTitleEdit(event.title)
            setDescriptionEdit(event.description)
            setColorEdit(event.color)
            setCategoryEdit(event.type)
            if (event.type === "arrangement") {
                setEndTimeEdit(moment(event.end_At).format('HH:mm'))
                setStartTimeEdit(moment(event.start_At).format('HH:mm'))
            }
            else {
                setStartTimeEdit(moment(event.start_At).format('HH:mm'))
            }
        }
    }, [event])

    // useEffect(() => {
    //     if(timeStartEdit != "00:00" || timeStartEdit){
    //         setEndTimeEdit(timeStartEdit.add(5, 'minute'));
    //     }
        
    // }, [timeStartEdit])
    

    const setEdit = (e) => {
        e.preventDefault();
        isEdit
            ?
            setIsEdit(false)
            :
            setIsEdit(true)
    }

    const handleChangeComplete = (color, event) => {
        setColorEdit(color.hex)
    };


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
        // console.log(event);
        return (
            <div>
                {console.log("c_id: " + calendar_id)}
                {isEdit
                    ?
                    <form>
                        <MyInput
                            value={titleEdit}
                            onChange={e => setTitleEdit(e.target.value)}
                            type="text"
                            placeholder="Event title"
                        />
                        <MyInput
                            value={descriptionEdit}
                            onChange={e => setDescriptionEdit(e.target.value)}
                            type="text"
                            placeholder="Event description"
                        />
                        <MySelect
                            value={categoryEdit}
                            defaultValue={"Choose category"}
                            options={categories.map(el => {
                                return { value: el, name: el }
                            })}
                            onChange={selectedCategory => setCategoryEdit(selectedCategory)}
                        />
                        <MyInput
                            value={colorEdit}
                            onChange={e => setColorEdit(e.target.value)}
                            type="text"
                            placeholder="Event color"
                            disabled={true}
                        />
                        <ChromePicker
                            color={colorEdit}
                            onChangeComplete={handleChangeComplete}
                        />
                        {/* <br></br>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <TimePicker
                                    onClick={e => console.log(e.target.value)}
                                    ampm={false}
                                    minutesStep={5}
                                    value={timeEdit}
                                    onChange={setTimeEdit}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider> */}
                        <br></br>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                {categoryEdit === 'arrangement' ?
                                    <>
                                        <TimePicker
                                            label='Event start'
                                            ampm={false}
                                            minutesStep={5}
                                            value={timeStartEdit}
                                            onChange={setStartTimeEdit}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <TimePicker
                                            label='Event end'
                                            ampm={false}
                                            minutesStep={5}
                                            value={timeEndEdit}
                                            onChange={setEndTimeEdit}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </>
                                    :
                                    <>
                                        <TimePicker
                                            label='Event start'
                                            ampm={false}
                                            minutesStep={5}
                                            value={timeStartEdit}
                                            onChange={setStartTimeEdit}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </>
                                }
                            </Stack>
                        </LocalizationProvider>
                        <h2>{errorMessage}</h2>
                        <MyButton onClick={(e) => {
                            e.preventDefault()
                            // if(timeEndEdit === '00:00'){
                            //     // console.log("time: " + timeStartEdit.add(5, 'minute').format('HH:mm'))
                            //     // console.log("aboba")
                            //     setEndTimeEdit(timeStartEdit.add(5, 'minute'))
                            // }
                            // console.log(event)
                            let body ;
                            if(categoryEdit === "arrangement"){
                                body ={
                                    title: titleEdit,
                                    description: descriptionEdit,
                                    color: colorEdit,
                                    type: categoryEdit,
                                    start_at: timeStartEdit,
                                    end_at: timeEndEdit
                                }
                            }
                            else{
                                body ={
                                    title: titleEdit,
                                    description: descriptionEdit,
                                    color: colorEdit,
                                    type: categoryEdit,
                                    start_at: timeStartEdit,
                                    end_at: timeStartEdit
                                }
                            }
                            // console.log(calendar_id)
                            dispatch(UpdateEvent(calendar_id, event.id, body))
                            setVisible(false);
                        }}
                        >
                            {"Submit"}
                        </MyButton>
                        <MyButton style={{ marginRight: 5 }} onClick={(e) => {
                            e.preventDefault()
                            isEdit ? setIsEdit(false) : setIsEdit(true)
                        }}>{"Close"}</MyButton>
                    </form>
                    :
                    <form>
                        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>Event {event.user_id === user_id ? <div><ShareIcon /> <DeleteIcon /> <EditIcon onClick={(e) => { setEdit(e) }} /></div> : <></>}</h1>
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
                            </>
                        }
                    </form>
                }

            </div>

        )
    }
}

export default EventView;



