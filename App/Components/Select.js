import React, { useEffect, useRef, useState } from "react";

const Select = props => {

    let selectElement = useRef(null),
    [customValue, setCustomValue] = useState(''),
    [displayOptions, setDisplayOptions] = useState(false),
    customOptionsElement = useRef(null)

    const getNativeSelectText = () => {
        let selectNativeOptions = selectElement.current.children
        selectNativeOptions = [...selectNativeOptions]
        return props.timezones.length === 0 ?  '' : selectNativeOptions.find(i => {return i.selected === true}).text
    }

    const changeNativeSelectValue = (event) => {
        selectElement.current.value = event.target.value
        changeTimezone(event)
        setDisplayOptionsState()
    }

    const changeTimezone = (event) => {
        props.changeTimezone(event.target.value)
        setCustomValue(getNativeSelectText())
    }

    const setDisplayOptionsState = () => {
        setDisplayOptions(displayOptions ? false : true)
    }

    const handleOutsideClick = (event) => {
        if (customOptionsElement && !customOptionsElement.current.contains(event.target)) {
            setDisplayOptions()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
    },[])

    useEffect(() => {
        setCustomValue(getNativeSelectText())
    },[props.timezones])
   
    return <div className="selectWrap">
        <select className="selectNative" ref={selectElement} onChange={changeTimezone} value={props.timezone}>
            {props.timezones.length === 0 ?  '' : props.timezones.map((i, index) => {
                return <option key={index} value={i.timezone} >{i.name}</option>})}
        </select>
        <div ref={customOptionsElement} className="selectCustom" aria-hidden={true}>
            <div className={`select ${displayOptions ? 'active' : ''}`} onClick={setDisplayOptionsState}>{customValue}
            </div>
            <ul className={`options ${displayOptions ? 'active' : ''}`}>
                {props.timezones.length === 0 ?  '' : props.timezones.map((i, index) => {
                    return <li className="options__item" key={index} value={i.timezone} onClick={changeNativeSelectValue} >{i.name}</li>})}
            </ul>
        </div>
    </div>
}

export default Select