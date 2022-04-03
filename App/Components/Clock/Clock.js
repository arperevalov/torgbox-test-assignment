import React from "react";
import DigitalClock from "./DigitalClock";
import AnalogClock from './AnalogClock';
import Select from "../Select";
import Preloader from "../Preloader";

class Clock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentTimezone: undefined,
        }
    }

    changeTimezone = (inputTimezone) => {
        inputTimezone = parseInt(inputTimezone)
        this.setState({currentTimezone: inputTimezone})
    }

    componentDidUpdate() {
        if (this.state.currentTimezone === undefined && this.props.timezones.length !== 0) {
            this.setState({currentTimezone: this.props.timezones[0].timezone})
        } 
    }

    render() {
        if (this.props.time === undefined) {
            return <Preloader/>
        }

        const timezoneTime = new Date(
            this.props.time.getFullYear(),
            this.props.time.getUTCMonth(),
            this.props.time.getUTCDay(),
            this.props.time.getUTCHours()+this.state.currentTimezone,
            this.props.time.getUTCMinutes(),
            this.props.time.getUTCSeconds())

        return <div className="clock">
            <AnalogClock time={timezoneTime}/>
            <DigitalClock time={timezoneTime}/>
            <Select timezones={this.props.timezones} changeTimezone={this.changeTimezone} timezone={this.state.timezone}/>
        </div>
    }
}

export default Clock