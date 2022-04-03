import React from "react";
import secondsArrow from './../../../src/img/secondsArrow.svg';
import clockPin from './../../../src/img/clockPin.svg';
import logo from './../../../src/img/logo.svg';

const AnalogClock = props => {
    
    let seconds = props.time.getSeconds()*6+180,
        minutes = props.time.getMinutes()*6,
        hours = props.time.getHours()*30

    return <div className="analogClock">
        <div className="secondsWrap" style={{transform: `rotate(${seconds}deg)`}}>
            <img src={secondsArrow} className="seconds"/>
        </div>
        <div className="minsWrap" style={{transform: `rotate(${minutes}deg)`}}>
            <div className="mins"/>
        </div>
        <div className="hoursWrap" style={{transform: `rotate(${hours}deg)`}}>
            <div className="hours"/>
        </div>

        <img src={clockPin} className="pin"/>

        <img src={logo} className="logo"/>

        <div className="segment first"></div>
        <div className="segment second"></div>
        <div className="mask"></div>
    </div>
}

export default AnalogClock