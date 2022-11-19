import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCalendarByUser } from "../../action/CalendarAction";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const CreateCalendarForm = ({user_id}) => {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    return (
        <form>
            <h1>Create Calendar</h1>
            <MyInput value={title}
                placeholder="Enter title of calendar"
                onChange={ e => setTitle(e.target.value)} />
            <MyButton onClick = { () => {
                dispatch(createCalendarByUser(title, user_id))
            }}>Create Calendar</MyButton>
        </form>
    )
}

export default CreateCalendarForm