import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../UI/button/MyButton'
import MyInput from '../UI/input/MyInput'
import MySelect from '../UI/select/MySelect';
import moment from 'moment';
import { SketchPicker, ChromePicker } from 'react-color';
import { CreateEvent, DeleteEvent } from '../../action/EventAction';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { deleteEvent } from '../../api/EventApi';


const EventView = ({ date, calendar_id, body, setVisible }) => {
    const [title, setTitle] = useState(body.title);
    const [isEdit, setIsEdit] = useState(false);
    const [description, setDescription] = useState(body.description);
    const [color, setColor] = useState(body.color);
    const [titleEdit, setTitleEdit] = useState();
    const [descriptionEdit, setDescriptionEdit] = useState();
    const [colorEdit, setColorEdit] = useState();
    const [timeEdit, setTimeEdit] = useState("");
    const [categoryEdit, setCategoryEdit] = useState(body.type);
    // const [time, setTime] = useState(body.time.split('T')[1].split('.')[0]);
    const [time, setTime] = useState("");
    const [errorMessage, setMessage] = useState('');
    const [categories, setCatigories] = useState(['arrangement', 'reminder', 'task']);
    const [category, setCategory] = useState(body.type);

    let exactTime = moment(time.valueOf()).format('HH:mm')
    const dispatch = useDispatch()
    const sendReq = (e) => {
        e.preventDefault();
        console.log("aboba")
    }
    const handleChangeComplete = (color, event) => {
        setColor(color.hex);
        setColorEdit(color.hex)
    };
    useEffect(() => {
        //
        setIsEdit(false) 
        if (body.time) {
            setTitle(body.title)
            setDescription(body.description)
            setColor(body.color)
            setCategory(body.type)
            setTime(body.time.split('T')[1].split('.')[0])

            setTitleEdit(title)
            setDescriptionEdit(description)
            setColorEdit(color)
            setCategoryEdit(category)
            // setTimeEdit(time.split(':')[0]+":"+timeEdit.split(':')[1])
        }
    }, [body])
    const setEdit = (e) =>{
        e.preventDefault();
        isEdit 
        ? 
            setIsEdit(false) 
        : 
            setIsEdit(true)
            setTimeEdit(time.split(':')[0]+":"+timeEdit.split(':')[1])
    }
    return (
        <div>
            {isEdit
                ? <div>
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
                        <br></br>
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
                        </LocalizationProvider>
                        <h2>{errorMessage}</h2>
                        <MyButton onClick={(e) => {
                            e.preventDefault()
                            const body = {
                                title: titleEdit,
                                description: descriptionEdit,
                                color: colorEdit,
                                type: categoryEdit
                            }
                            console.log(body)
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
                </div>
                : <div>
                    <form>
                        <h1>Event</h1>
                        <MyInput
                            value={"author: " + body.author_id}
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
                        <MyButton onClick={(e) => {
                            e.preventDefault()
                            console.log(time)
                            isEdit ? setIsEdit(false) : setIsEdit(true)
                        }}
                        >
                            {"Edit Event"}
                        </MyButton>
                        <MyButton style={{ marginRight: 5 }} onClick={(e) => {
                            e.preventDefault()
                            dispatch(DeleteEvent(body.calendar_id, body.id))
                            setVisible(false)
                        }}>{"Delete"}</MyButton>
                    </form>
                </div>
            }
        </div>

    )
}

export default EventView;



