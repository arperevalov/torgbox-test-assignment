import React, { useEffect } from "react";
import { connect } from "react-redux";
import Preloader from "../Preloader";
import { updateTimezones, setFetch, setTime, setWorking } from './../../Redux/ClockReducer';
import Clock from './Clock'

const ClockAPI = props => {

    const updateTime = () => {
        setInterval(() => {
            props.setTime(new Date())
        }, 1000);
    }

    useEffect(()=>{
        if (props.timezones.length === 0) {
            props.setFetch(true)
            fetch('./../src/json/timezones.json')
            .then(r => r.json(), 
            err => {
                props.updateTimezones([{
                    "timezone": 0,
                    "name": "UTC±0:00"
                  },])
                props.setFetch(false)
                throw new Error(err)
            })
            .then(r => {
                let arr = r.map(i => {
                    return {
                        ...i,
                        timezone: parseInt(i.timezone)
                    }
                })
                props.updateTimezones([...arr])
                props.setFetch(false)
            })
        }
    },[])

    useEffect(()=>{
        if (props.defaultTimezone !== undefined && !props.clockWorking) {
            updateTime()
            props.setWorking()
        }
    },[props.defaultTimezone, props.clockWorking])

    return <div className="clock-container">
    {props.isFetching ? <Preloader/> : ''}
    { Array.from({length: props.clockQuantity}, (i, index) => <Clock key={index} timezones={props.timezones} time={props.time} defaultTimezone={props.defaultTimezone} />) }
    </div>
}

const mapStateToProps = store => {
    return {
        clockQuantity: store.clockPage.quantity,
        timezones: store.clockPage.timezones,
        isFetching: store.clockPage.isFetching,
        time: store.clockPage.time,
        clockWorking: store.clockPage.clockWorking,
        defaultTimezone: store.clockPage.defaultTimezone
    }
}

const ClockContainer = connect(mapStateToProps, {
    updateTimezones,
    setFetch,
    setTime,
    setWorking
})(ClockAPI)

export default ClockContainer