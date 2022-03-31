import React from "react";

const DigitalClock = props => {
    return <div>
            {props.time.toLocaleTimeString()}
        </div>
}

export default DigitalClock