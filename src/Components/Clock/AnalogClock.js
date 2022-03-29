import React from "react";

const AnalogClock = props => {
    return <div className="analogClock">
        <div className="secondsWrap" style={{transform: `rotate(${props.seconds}deg)`}}>
            <div className="seconds"/>
        </div>
        <div className="minsWrap" style={{transform: `rotate(${props.mins}deg)`}}>
            <div className="mins"/>
        </div>
        <div className="hoursWrap" style={{transform: `rotate(${props.hours}deg)`}}>
            <div className="hours"/>
        </div>

        <div className="segment first"></div>
        <div className="segment second"></div>
        <div className="mask first"></div>
        <div className="mask second"></div>
    </div>
}

export default AnalogClock