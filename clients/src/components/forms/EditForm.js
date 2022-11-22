import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateCalendar } from "../../action/CalendarAction";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import EditIcon from '@mui/icons-material/Edit';



const EditCalendarForm = ({user_id, calendar_id, title, description}) => {
    const [titlee, setTitle] = useState(``)
    const [descriptionn, setDescription] = useState(``)
    const dispatch = useDispatch()
    return (
        <form>
            <h1>Edit {title}</h1>
            <MyInput value={titlee}
                placeholder="Enter new of calendar"
                onChange={ e => setTitle(e.target.value)} 
            />
            <MyInput value={descriptionn}
                placeholder="Enter new description of calendar"
                onChange={ e => setDescription(e.target.value)} 
            />
            <MyButton onClick = { () => {
                dispatch(UpdateCalendar(user_id, calendar_id, titlee, descriptionn))
            }}>Edit <EditIcon /></MyButton>
        </form>
    )
}

export default EditCalendarForm