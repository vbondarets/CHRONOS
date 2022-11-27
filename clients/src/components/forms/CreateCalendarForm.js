import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCalendarByUser } from "../../action/CalendarAction";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import CreateIcon from '@mui/icons-material/Create';
import {Alert} from 'react-bootstrap'
import { ChromePicker } from "react-color";

const CreateCalendarForm = ({user_id}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const [color, setColor] = useState()
    const handleChangeComplete = (color, event) => {
        setColor(color.hex);
    };
    return (
        <>
            <form>
                <h1>Create Calendar <CreateIcon /></h1>
                <MyInput value={title}
                    placeholder="Enter title of calendar"
                    onChange={ e => setTitle(e.target.value)} 
                />
                <MyInput value={description}
                    placeholder="Enter description of the calendar"
                    onChange={ e => setDescription(e.target.value)} 
                />
                <ChromePicker
                    color={color}
                    onChangeComplete={handleChangeComplete}
                />
                <MyButton onClick = { () => {
                    dispatch(createCalendarByUser(title, user_id, description, color))
                }}>Create Calendar <CreateIcon /></MyButton>
            </form>
        </>
    )
}

export default CreateCalendarForm