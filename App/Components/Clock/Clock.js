import React from "react";
import DigitalClock from "./DigitalClock/DigitalClock";
import AnalogClock from './AnalogClock/AnalogClock';
import Select from "../Select";
import Preloader from "../Preloader";

class Clock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            timezone: null,
            time: null,
            working: false
        }
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

    componentDidUpdate() {
        if (this.state.timezone === null && this.props.timezones.length !== 0) {
            this.setState({timezone: this.props.timezones[0].timezone})
        } 

        if (this.state.timezone !== null && !this.state.working) {
            this.updateTime()
            this.setState({working: true})
        }
    }

    render() {
        if (this.state.time === null) {
            return <Preloader/>
        }

        return <div className="clock">
            <AnalogClock time={this.state.time}/>
            <DigitalClock time={this.state.time}/>
            <Select timezones={this.props.timezones} changeTimezone={this.changeTimezone} timezone={this.state.timezone}/>
        </div>
    }
}

export default Clock