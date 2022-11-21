import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCalendarByUser } from "../../action/CalendarAction";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const CreateCalendarForm = ({user_id}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    return (
        <form>
            <h1>Create Calendar</h1>
            <MyInput value={title}
                placeholder="Enter title of calendar"
                onChange={ e => setTitle(e.target.value)} 
            />
            <MyInput value={description}
                placeholder="Enter description of calendar"
                onChange={ e => setDescription(e.target.value)} 
            />
            <MyButton onClick = { () => {
<<<<<<< HEAD
                // console.log("tut") 
                dispatch(createCalendarByUser(title, user_id))
=======
                dispatch(createCalendarByUser(title, user_id, description))
>>>>>>> 800ecb92e83b8cf2277f61c65507f7f5292d7afd
            }}>Create Calendar</MyButton>
        </form>
    )
}

export default CreateCalendarForm