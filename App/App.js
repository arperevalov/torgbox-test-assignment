import React from "react";
import ClockContainer from "./Components/Clock/ClockContainer";

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <ClockContainer/>
        </div>
    }
}

export default App