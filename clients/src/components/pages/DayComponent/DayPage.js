import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllEventByCalendar } from "../../../action/EventAction";
import EventView from "../../forms/EventView";
import style from '../../style/DayPageStyle.module.css'
import MyButton from "../../UI/button/MyButton";
import MyModal from "../../UI/MyModal/MyModal";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const DayPage = () => {
    const { day, calendar_id } = useParams()
    const event = useSelector(state => state.Event)
    const dispatch = useDispatch()
    const [visisble, setVisible] = useState(false)
    const [currentEvent, setCurrentEvent] = useState('')
    const params = useParams();
    const weekdays = moment()._locale._weekdays;
    const months = moment()._locale._months;
    const UserStore = useSelector(store => store.User)
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllEventByCalendar(calendar_id))
    }, [dispatch])

    let AllEvent = event.events
    if (AllEvent === undefined) {
        AllEvent = []
    }
    console.log(calendar_id);
    const time = new Array(24)
    for (var i = 0; i < time.length; i++) {
        time[i] = new Array(12);
    }
    const value_of_date = new Array(24)
    for (var i = 0; i < time.length; i++) {
        value_of_date[i] = new Array(12);
    }
    const bigtime = []
    for (let index = 0; index < 24; index += 1) {
        for (let q = 0; q < 12; q++) {
            if (index < 10) {
                if (q === 0 || q * 5 === 5) {
                    time[index][q] = `0${index}:0${q * 5}`
                }
                else {
                    time[index][q] = `0${index}:${q * 5}`
                }
            }

            else {
                if (q === 0 || q * 5 === 5) {
                    time[index][q] = `${index}:0${q * 5}`
                }
                else {
                    time[index][q] = `${index}:${q * 5}`
                }
            }
        }
    }
    for (let index = 0; index < 24; index++) {
        if (index < 10) {
            bigtime.push(`0${index}:00`)
        }
        else {
            bigtime.push(`${index}:00`)
        }

    }
    for (let index = 0; index < 24; index += 1) {
        for (let i = 0; i < 12; i++) {
            value_of_date[index][i] = `${day} ${time[index][i]}`
        }
    }
    for (let index = 0; index < 96; index++) {

    }
    let value_of_bigTime = []
    for (let index = 0; index < 24; index++) {
        value_of_bigTime.push(`${day} ${bigtime}`)
    }

    console.log(value_of_date);
    return (
        <div>
            <MyModal visible={visisble} setVisible={setVisible}>
                <EventView
                    calendar_id={currentEvent.calendar_id}
                    event={currentEvent}
                />
            </MyModal>
            <div className={style.DayInfo}>
                <button className={style.createBuuton} onClick = { () => {history.push(`/calendar/${calendar_id}/create_event`)}}>Create event <AddCircleIcon /></button>
                <button className={style.createBuuton}
                        onClick={(e) => {
                            e.preventDefault();
                            history.goBack()
                        }}>
                    Go Back <ArrowBackIosIcon /></button>
                <h3 style={{ margin: 0, padding:'3px', color: "#4717f6"}}>{months[moment().month()]} {moment().date()} {weekdays[moment().day()]}</h3>
                {
                    console.log(moment())
                }
            </div>
            <div className={style.Container}>

                <table style={{ width: 'fit-content', borderSpacing: 0 }}>
                    <tbody>
                        {bigtime.map((date, index) => {
                            return (
                                <tr style={{ width: 'fit-content', height: 40 }} value={value_of_bigTime[index]} key={index}>
                                    <td className={style.BigTime}>{date}</td>
                                    {time.map((tm, indx) => {
                                        return (
                                            <tr className={style.Grid} key={indx}>
                                                {/* {console.log(value_of_date[index][indx])} */}
                                                {/* {AllEvent.map((ev) => {
                                            if (moment(ev.start_At).format('YYYY-MM-DD HH:mm').toString() === value_of_date[index][indx]) {
                                                return(<td onClick={(e) => {
                                                            e.stopPropagation()
                                                            setCurrentEvent(ev)
                                                            setVisible(true)
                                                        }}
                                                    style={{backgroundColor:ev.color, width:'3%', padding:'5px', color:'white', textAlign:'center'}} key={ev.id}>{ev.title}</td>)
                                            }
                                            else {
                                                return(<td style={{display:'none'}}></td>)
                                            }
                                        })} */}
                                            </tr>
                                        )
                                    })}
                                    <div className={style.Underline}></div>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {AllEvent.map((event) => {
                    // console.log(moment(event.start_At).format('YYYY-MM-DD'))
                    // console.log(params)
                    if (moment(event.start_At).format('YYYY-MM-DD') === params.day) {
                        
                        let height = 35;
                        let duration = 1;
                        let margin = 0;
                        if (parseInt(moment(event.start_At).format('mm')) >= 15) {
                            margin = 10;
                            if (parseInt(moment(event.start_At).format('mm')) >= 30) {
                                margin = 20;
                                if (parseInt(moment(event.start_At).format('mm')) >= 45) {
                                    margin = 30;
                                }
                            }
                        }

                        // {console.log(parseInt(moment(event.start_At).format('mm')))}
                        if (event.type === "arrangement") {
                            // console.log(parseInt(moment(event.end_At).format('HH')) + "-" + parseInt(moment(event.start_At).format('HH')))

                            duration = parseInt(moment(event.end_At).format('HH')) - parseInt(moment(event.start_At).format('HH'))
                            // console.log("duration: " + duration)
                            height = (height * duration) + ((parseInt(moment(event.end_At).format('HH')) - parseInt(moment(event.start_At).format('HH')) - 1) * 5)
                        }
                        return (
                            <div onClick={(e) => {
                                e.stopPropagation()
                                setCurrentEvent(event)
                                setVisible(true)
                            }}
                                className={style.Event}
                                style={{ backgroundColor: event.color, paddingTop: 5, color: 'white', textAlign: 'center', height: height, marginTop: parseInt(moment(event.start_At).format('HH')) * 40 + margin }}
                                key={event.id}

                            >
                                <p style={{ margin: 0 }}>{event.title}</p>
                                {duration > 1 &&
                                    <p style={{ margin: 0 }}>Author: {UserStore.allUsers.map(el => {
                                        if(el.id === event.author_id){
                                            return el.login
                                        }
                                    })}</p>
                                }
                                

                            </div>

                        )
                    }

                    // if (moment(event.start_At).format('YYYY-MM-DD HH:mm').toString() === value_of_date[index][indx]) {
                    //     return (<td onClick={(e) => {
                    //         e.stopPropagation()
                    //         setCurrentEvent(ev)
                    //         setVisible(true)
                    //     }}
                    //         style={{ backgroundColor: ev.color, width: '3%', padding: '5px', color: 'white', textAlign: 'center' }} key={ev.id}>{ev.title}</td>)
                    // }
                    // else {
                    //     return (<td style={{ display: 'none' }}></td>)
                    // }
                })}
            </div>
        </div>
    )
}

export default DayPage