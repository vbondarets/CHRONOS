import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import MyButton from '../UI/button/MyButton'
import MyInput from '../UI/input/MyInput'
import MySelect from '../UI/select/MySelect';
import moment from 'moment';
import { SketchPicker, ChromePicker } from 'react-color';

const EventForm = ({ date }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#4169e1');
    const [time, setTime] = useState('00:00');
    const [errorMessage, setMessage] = useState ('');
    const [categories, setCatigories] = useState(['arrangement', 'reminder', 'task']);
    const [category, setCatigory] = useState('');

    const sendReq = (e) => {
        e.preventDefault();
        
        const body = {
            title: title,
            description: description,
            type: category,
            // time: moment().format("YYYY-MM-DD HH:mm")
            time: date + " " + time
        }
        console.log(body);
    }
    const handleChangeComplete = (color, event) => {
        // this.setState({ background: color.hex });
        setColor(color.hex);
    };
    return (
        <form>
            <h1>Event</h1>
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
                options={categories.map(el =>{
                    return {value: el, name: el}
                })}
                onChange={selectedCategory => setCatigory(selectedCategory)}
            />
            <MyInput
                value={color}
                onChange={e => setColor(e.target.value)}
                type="text"
                placeholder="Event color"
            />
            <ChromePicker
                color = {color}
                onChangeComplete={ handleChangeComplete }
            />
            <MyInput
                value={time}
                onChange={e => setTime(e.target.value)}
                type="text"
                placeholder="Event time"
            />
            <h2>{errorMessage}</h2>
            <MyButton onClick={(e) => sendReq(e)}>{"Create Event"}</MyButton>
            <button style={{color: color}}>test</button>
        </form>
    )
}

export default EventForm;



