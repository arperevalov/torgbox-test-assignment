import React from "react";
import AnalogClock from "./AnalogClock";

class Clock extends React.Component {
    constructor(props){
        super(props)
        this.timezone = props.timezone
        this.state = {
            time: this.getTimeFromUTC(this.timezone.timezone),
            seconds: 0,
            mins: 0,
            hours: 0,
        }
    }

    getTimeFromUTC(timezone) {
        if (timezone.length === 0) timezone = 0
        timezone = parseInt(timezone)

        

        let currentLocalTime = new Date()
        let currentUTCTime = new Date(currentLocalTime.getFullYear(),currentLocalTime.getUTCMonth(),currentLocalTime.getUTCDay(),currentLocalTime.getUTCHours()+timezone,currentLocalTime.getUTCMinutes(),currentLocalTime.getUTCSeconds())

        //refactor
        this.setState({seconds: currentUTCTime.getSeconds()*6})
        this.setState({mins: currentUTCTime.getMinutes()*6})
        this.setState({hours: (currentUTCTime.getHours() * 30)})

        return currentUTCTime.toLocaleTimeString()
    }

    updateTime () {
        setInterval(() => {
            this.setState({time: this.getTimeFromUTC(this.timezone.timezone)})
        }, 1000);
    }

    componentDidMount () {
        this.updateTime()
    }

    render() {
        return <div>
            <AnalogClock seconds={this.state.seconds} mins={this.state.mins} hours={this.state.hours}/>
            {this.state.time}
            <br/>
            {this.timezone.name}
        </div>
    }
}

export default Clock

//  360 deg
//  3600 seconds
//