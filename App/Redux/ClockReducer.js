const UPDATE_TIMEZONES = 'UPDATE_TIMEZONES',
SET_FETCH = 'SET_FETCH',
SET_TIME = 'SET_TIME',
SET_WORKING = 'SET_WORKING'

const DefaultState = {
    quantity: 2,
    timezones: [],
    isFetching: false,
    time: null,
    clockWorking: false,
    defaultTimezone: null
}

const ClockReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case UPDATE_TIMEZONES:
            return {
                ...state,
                timezones: action.timezones,
                defaultTimezone: action.timezones[0].timezone
            }
            break;
        case SET_FETCH:
            return {
                ...state,
                isFetching: action.fetchState
            }
        case SET_TIME:
            return {
                ...state,
                time: action.time
            }
        case SET_WORKING:
            return {
                ...state,
                clockWorking: state.clockWorking ? false : true
            }
        default:
            return state
            break;
    }
}

export const updateTimezones = (timezones) => ({type: UPDATE_TIMEZONES, timezones});
export const setFetch = (fetchState) => ({type: SET_FETCH, fetchState});
export const setTime = (time) => ({type: SET_TIME, time});
export const setWorking = () => ({type: SET_WORKING});

export default ClockReducer;