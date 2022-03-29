import React from "react";
import Clock from "./Clock/Clock";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timezones: [],
            isFetching: false
        }
    }

    //refactor
    componentDidMount () {
        this.setState({isFetching: true})
        fetch('./src/json/timezones.json')
        .then(r => r.json())
        .then(r => {
            this.setState({timezones: [...r]})
            this.setState({isFetching: false})
        })
    }

    render() {
        return <div>
            {this.state.isFetching ? <div>Is fetching</div> : ''}
            {
                this.state.timezones.map(i =>{
                return <Clock timezone = {i}/>
                    })
            }
        </div>
    }
}

export default App