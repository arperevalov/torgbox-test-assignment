import React from "react";
import { connect } from "react-redux";
import Preloader from "../Preloader";
import { updateTimezones, setFetch, setTime, setWorking } from './../../Redux/ClockReducer';
import Clock from './Clock'

class ClockAPI extends React.Component {

    getTimeFromUTC(currentTimezone) {
        const currentLocalTime = new Date()
        const currentUTCTime = new Date(
            currentLocalTime.getFullYear(),
            currentLocalTime.getUTCMonth(),
            currentLocalTime.getUTCDay(),
            currentLocalTime.getUTCHours()+currentTimezone,
            currentLocalTime.getUTCMinutes(),
            currentLocalTime.getUTCSeconds())
        return currentUTCTime
    }

    updateTime () {
        setInterval(() => {
            this.props.setTime(this.getTimeFromUTC(0))
        }, 1000);
    }

    componentDidMount () {
        if (this.props.timezones.length === 0) {
            this.props.setFetch(true)
            fetch('./../src/json/timezones.json')
            .then(r => r.json(), 
            err => {
                this.props.updateTimezones([{
                    "timezone": "0",
                    "name": "UTC±0:00"
                  },])
                this.props.setFetch(false)
                throw new Error(err)
            })
            .then(r => {
                let arr = r.map(i => {
                    return {
                        ...i,
                        timezone: parseInt(i.timezone)
                    }
                })
                this.props.updateTimezones([...arr])
                this.props.setFetch(false)
            })
        }
    }

    componentDidUpdate () {
        if (this.props.defaultTimezone !== null && !this.props.clockWorking) {
            this.updateTime()
            this.props.setWorking()
        }
    }

    render() {
        return <div className="clock-container">
        {this.props.isFetching ? <Preloader/> : ''}
        { Array.from({length: this.props.clockQuantity}, (i, index) => <Clock key={index} timezones={this.props.timezones} time={this.props.time} defaultTimezone={this.props.defaultTimezone} />) }
        </div>
    }
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