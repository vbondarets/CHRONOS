import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllEventByCalendar } from "../../../action/EventAction";
import EventView from "../../forms/EventView";
import style from '../../style/DayPageStyle.module.css'
import MyModal from "../../UI/MyModal/MyModal";


const DayPage = () => {
    const { day, calendar_id } = useParams()
    const event = useSelector(state => state.Event)
    const dispatch = useDispatch()
    const [visisble, setVisible] = useState(false)
    const [currentEvent, setCurrentEvent] = useState('')
    const params = useParams();

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
        <div className={style.Container}>
            <MyModal visible={visisble} setVisible={setVisible}>
                <EventView
                    event={currentEvent}
                />
            </MyModal>
            <table style={{ width: 'fit-content', borderSpacing: 0
         }}>
                <tbody>
                    {bigtime.map((date, index) => {
                        return (
                            <tr style={{ width: 'fit-content' }} value={value_of_bigTime[index]} key={index}>
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {AllEvent.map((event) => {
                // console.log(moment(event.start_At).format('YYYY-MM-DD'))
                // console.log(params)
                if(moment(event.start_At).format('YYYY-MM-DD') === params.day){
                    console.log(moment(event.start_At).format('HH'))
                    let height = 24.5;
                    let duration = 1;
                    if(event.type === "arrangement"){
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
                            style={{ backgroundColor: event.color, paddingTop: 5, color: 'white', textAlign: 'center' , height: height, marginTop: parseInt(moment(event.start_At).format('HH')) * 29.5}} 
                            key={event.id}

                        >
                            {event.title}
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
    )
}

export default DayPage