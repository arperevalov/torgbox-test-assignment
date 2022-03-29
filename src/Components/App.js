import React from "react";
import Clock from "./Clock/Clock";

const App = (props) => {

    let clocks = props.data.map(i =>{
        return <Clock timezone = {i}/>
    })
    
    return <div>
        {clocks}
    </div>
}

export default App