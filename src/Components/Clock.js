import React from "react";

class Clock extends React.Component {
    constructor(props){
        super(props)
        this.timezone = props.timezone
        this.state = {
            time: this.getTimeFromUTC(this.timezone.timezone)
        }
    }

    getTimeFromUTC(timezone) {
        if (timezone.length === 0) timezone = 0
        timezone = parseInt(timezone)

        let currentLocalTime = new Date()
        let currentUTCTime = new Date(currentLocalTime.getFullYear(),currentLocalTime.getUTCMonth(),currentLocalTime.getUTCDay(),currentLocalTime.getUTCHours()+timezone,currentLocalTime.getUTCMinutes(),currentLocalTime.getUTCSeconds())
        
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
            {this.state.time}
            <br/>
            {this.timezone.name}
        </div>
    }
}

export default Clock