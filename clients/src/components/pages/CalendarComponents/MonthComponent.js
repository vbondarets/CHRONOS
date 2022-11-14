import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import style from '../../style/CalendarStyle.module.css'


const MonthComponent = (props) => {
    const {setMonths, setNow,setYear, now, months, year} = props
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']

    return (
        <>
            <p className={style.Header}>
                <ArrowBackIosIcon className={style.Arrows} style={{cursor:'pointer'}} onClick={ () => {
                    setNow(now.subtract(1,'month'))
                    setYear(now.year())
                    setMonths(now.month())
                }}>
                    Prev
                </ArrowBackIosIcon>
                    {month[months]} {year} 
                <ArrowForwardIosIcon className={style.Arrows} style={{cursor:'pointer'}} onClick={ () => {
                    setNow(now.add(1,'month'))
                    setYear(now.year())
                    setMonths(now.month())
                }}>
                    Next
                </ArrowForwardIosIcon> 
            </p>
        </>
    ) 
}

export default MonthComponent