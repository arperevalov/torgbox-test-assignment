import React, { useRef } from "react";

const Select = props => {

    const changeTimezone = (event) => {
        props.changeTimezone(event.target.value)
    }

    
    return <div>
        <select onChange={changeTimezone} value={props.timezone}>
            {props.timezones.length == 0 ?  '' : props.timezones.map((i, index) => {
                return <option key={index} value={i.timezone} >{i.name}</option>})}
        </select>
    </div>
}

export default Select