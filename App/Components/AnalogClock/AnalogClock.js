import React from "react";

const AnalogClock = props => {

    let seconds = props.time.getSeconds()*6
    let minutes = props.time.getMinutes()*6
    let hours = props.time.getHours()*15

    return <div className="analogClock">
        <div className="secondsWrap" style={{transform: `rotate(${seconds}deg)`}}>
            <div className="seconds"/>
        </div>
        <div className="minsWrap" style={{transform: `rotate(${minutes}deg)`}}>
            <div className="mins"/>
        </div>
        <div className="hoursWrap" style={{transform: `rotate(${hours}deg)`}}>
            <div className="hours"/>
        </div>

        <div className="segment first"></div>
        <div className="segment second"></div>
        <div className="mask first"></div>
        <div className="mask second"></div>
    </div>
}

export default AnalogClock