import React from "react";
import ReactDOM from "react-dom";
import App from "./src/Components/App";
import data from './src/json/timezones.json'

ReactDOM.render(
<App data = {data}/>,
document.getElementById('root')
);