import React, { useEffect, useState } from "react";
import DigitalClock from "./DigitalClock";
import AnalogClock from './AnalogClock';
import Select from "../Select";
import Preloader from "../Preloader";

const Clock = props => {
    const [currentTimezone, setCurrentTimezone] = useState(undefined)

    const changeTimezone = (inputTimezone) => {
        inputTimezone = parseInt(inputTimezone)
        setCurrentTimezone(inputTimezone)
    }

    useEffect(()=>{
        if (currentTimezone === undefined && props.timezones.length !== 0) {
            setCurrentTimezone(props.timezones[0].timezone)
        } 
    }, [props.timezones])

    if (props.time === undefined) {
        return <Preloader/>
    }

    const timezoneTime = new Date(
        props.time.getFullYear(),
        props.time.getUTCMonth(),
        props.time.getUTCDay(),
        props.time.getUTCHours()+currentTimezone,
        props.time.getUTCMinutes(),
        props.time.getUTCSeconds())

    return <div className="clock">
            <AnalogClock time={timezoneTime}/>
            <DigitalClock time={timezoneTime}/>
            <Select timezones={props.timezones} changeTimezone={changeTimezone} timezone={currentTimezone}/>
        </div>
}

export default Clock