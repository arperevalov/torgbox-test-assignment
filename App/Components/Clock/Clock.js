import React from "react";
import DigitalClock from "../DigitalClock/DigitalClock";
import AnalogClock from '../AnalogClock/AnalogClock';
import Select from "../Select";

class Clock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: this.getTimeFromUTC(this.getDefaultTimezone()),
            timezone: this.getDefaultTimezone()
        }
    }

    getDefaultTimezone () {
        let date = new Date
        return date.getTimezoneOffset()/-60
    }

    getTimeFromUTC(timezone) {
        if (typeof timezone != 'number') timezone = 0
        let currentLocalTime = new Date()
        let currentUTCTime = new Date(
            currentLocalTime.getFullYear(),
            currentLocalTime.getUTCMonth(),
            currentLocalTime.getUTCDay(),
            currentLocalTime.getUTCHours()+timezone,
            currentLocalTime.getUTCMinutes(),
            currentLocalTime.getUTCSeconds())
        return currentUTCTime
    }

    updateTime () {
        setInterval(() => {
            this.setState({time: this.getTimeFromUTC(this.state.timezone)})
        }, 1000);
    }

    changeTimezone = (inputTimezone) => {
        inputTimezone = parseInt(inputTimezone)
        this.setState({timezone: inputTimezone})
    }

    componentDidMount() {
        this.updateTime()
    }

    render() {
        return <div>
            <AnalogClock time={this.state.time}/>
            <DigitalClock time={this.state.time}/>
            <Select timezones={this.props.timezones} changeTimezone={this.changeTimezone} timezone={this.state.timezone}/>
        </div>
    }
}

export default Clock