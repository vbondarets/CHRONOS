import React from 'react'
import classes from './MyButton.module.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const MyButton = ({children, ...props}) => {
  return (
    <button {...props} className={classes.myBtn}>
        {children}
    </button>
  )
}

export default MyButton