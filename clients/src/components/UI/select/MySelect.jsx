import React from 'react'

const MySelect = ({options, defaultValue, value, onChange}) => {
  return (
    <>
      <br></br>
    <select 
        value={value}
        onChange={event => onChange(event.target.value)}
        style = {{padding:'5px', fontSize:'15px'}}
    >
        <option disabled={true} value="">{defaultValue}</option>
        {options.map(option => 
            <option key={option.value} value={option.value}>
                {option.name}
            </option>
        )}
    </select>
    </>
  )
}

export default MySelect