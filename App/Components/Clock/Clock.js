import React from "react";
import DigitalClock from "./DigitalClock/DigitalClock";
import AnalogClock from './AnalogClock/AnalogClock';
import Select from "../Select";

class Clock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            timezone: this.getDefaultTimezone(),
            time: this.getTimeFromUTC(this.getDefaultTimezone())
        }
    }

    getDefaultTimezone () {
        return this.props.timezones.length > 0 ? this.props.timezones[0].timezone : 0
    }

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

    // static getDerivedStateFromProps(props, state){
    //     return {
    //         timezone: props.timezones.length > 0 ? props.timezones[0].timezone : 0
    //     }
    // }

    render() {
        return <div className="clock">
            <AnalogClock time={this.state.time}/>
            <DigitalClock time={this.state.time}/>
            <Select timezones={this.props.timezones} changeTimezone={this.changeTimezone} timezone={this.state.timezone}/>
        </div>
    }
}

export default Clock