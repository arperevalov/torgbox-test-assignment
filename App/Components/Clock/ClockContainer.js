import React from "react";
import { connect } from "react-redux";
import { updateTimezones, updateTime, setFetch } from './../../Redux/ClockReducer';
import Clock from './Clock'

class ClockAPI extends React.Component {

    componentDidMount () {
        if (this.props.timezones.length === 0) {
            this.props.setFetch(true)
            fetch('./../src/json/timezones.json')
            .then(r => r.json())
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
        return <>
        { this.props.isFetching ? 'Is Fetching' : ''}
        { Array.from({length: this.props.clockQuantity}, () => <Clock timezones={this.props.timezones} />) }
        </>
    }
}

const mapStateToProps = store => {
    return {
        clockQuantity: store.clockPage.quantity,
        timezones: store.clockPage.timezones,
        time: store.clockPage.time,
        isFetching: store.clockPage.isFetching
    }
}

const ClockContainer = connect(mapStateToProps, {
    updateTimezones,
    updateTime,
    setFetch
})(ClockAPI)

export default ClockContainer