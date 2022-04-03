import React from "react";
import DigitalClock from "./DigitalClock";
import AnalogClock from './AnalogClock';
import Select from "../Select";
import Preloader from "../Preloader";

class Clock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            timezone: null,
        }
    }

    // getTimeFromUTC(currentTimezone) {
    //     const currentLocalTime = new Date()
    //     const currentUTCTime = new Date(
    //         currentLocalTime.getFullYear(),
    //         currentLocalTime.getUTCMonth(),
    //         currentLocalTime.getUTCDay(),
    //         currentLocalTime.getUTCHours()+currentTimezone,
    //         currentLocalTime.getUTCMinutes(),
    //         currentLocalTime.getUTCSeconds())
    //     return currentUTCTime
    // }

    // updateTime () {
    //     setInterval(() => {
    //         this.setState({time: this.getTimeFromUTC(this.state.timezone)})
    //     }, 1000);
    // }

    changeTimezone = (inputTimezone) => {
        inputTimezone = parseInt(inputTimezone)
        this.setState({timezone: inputTimezone})
    }

    componentDidUpdate() {
        if (this.state.timezone === null && this.props.timezones.length !== 0) {
            this.setState({timezone: this.props.timezones[0].timezone})
        } 
    }

    render() {
        if (this.props.time === null) {
            return <Preloader/>
        }

        let combinedTime = `${this.props.time.getHours() + this.state.timezone}:${this.props.time.getMinutes()}:${this.props.time.getSeconds()}`
        // return `${this.props.time.getHours() + this.state.timezone}:${this.props.time.getMinutes()}:${this.props.time.getSeconds()}`

        return <div className="clock">
            {`${this.props.time.getHours() + this.state.timezone}:${this.props.time.getMinutes()}:${this.props.time.getSeconds()}`}
            {/* <AnalogClock time={this.state.time}/>
            <DigitalClock time={this.state.time}/> */}
            <Select timezones={this.props.timezones} changeTimezone={this.changeTimezone} timezone={this.state.timezone}/>
        </div>
    }
}

export default Clock