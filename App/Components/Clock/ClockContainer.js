import React from "react";
import { connect } from "react-redux";
import { updateTimezones, updateTime, setFetch } from './../../Redux/ClockReducer';
import Clock from './Clock'

class ClockAPI extends React.Component {

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

    render() {
        return <div className="clock-container">
        { Array.from({length: this.props.clockQuantity}, (i, index) => <Clock key={index} timezones={this.props.timezones} />) }
        </div>
    }
}

const mapStateToProps = store => {
    return {
        clockQuantity: store.clockPage.quantity,
        timezones: store.clockPage.timezones,
        isFetching: store.clockPage.isFetching
    }
}

const ClockContainer = connect(mapStateToProps, {
    updateTimezones,
    setFetch
})(ClockAPI)

export default ClockContainer