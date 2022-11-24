import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllCalendars, ImportCalendar } from "../../../action/CalendarAction";
import style from '../../style/ImportPage.module.css'
import DownloadIcon from '@mui/icons-material/Download';
import jwt_decode from 'jwt-decode'
import { useHistory } from "react-router-dom";


const ImportPage = () => {
    const FamousPeople = ['Elon Musk', 'Zelenskiy', 'Baiden', 'ATB']
    const CalendarStore = useSelector(store => store.Calendar)
    const AuthStore = useSelector(store => store.Auth)
    const tokenn = AuthStore.token
    let decode, user_id,login
    decode = jwt_decode(tokenn)
    user_id = decode.id

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect ( () => {
        dispatch(AllCalendars())
    }, [dispatch])
    let Calendars = CalendarStore.allCalendars
    let FamousCalendars = []
    console.log(Calendars);
    if (Calendars === undefined) {
        Calendars = []
    }
    else {
        for (let index = 0; index < Calendars.length; index++) {
            for (let i = 0; i < FamousPeople.length; i++) {
                if (Calendars[index].title === `${FamousPeople[i]} Calendar`) {
                    FamousCalendars.push(Calendars[index])
                }
            }
        }
        return (
            <div className={style.Container}>    
                    {FamousCalendars.map ( (calendar, index) => {
                        return(
                            <div key={calendar.id} className={style.Content}>
                                <div className={style.Calendar}>
                                    <p style={{marginRight:'1%'}}>Title: {calendar.title}</p>
                                    <p>Description: {calendar.title}</p>
                                    <div>
                                        <button onClick={ () => {
                                            dispatch(ImportCalendar(calendar.id, user_id))
                                            history.push('/calendar')
                                        }} className={style.ImportButton}>Import <DownloadIcon /></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

export default ImportPage