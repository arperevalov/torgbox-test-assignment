const UPDATE_TIMEZONES = 'UPDATE_TIMEZONES',
UPDATE_TIME = 'UPDATE_TIME',
SET_FETCH = 'SET_FETCH'

const DefaultState = {
    quantity: 2,
    timezones: [],
    isFetching: false
}

const ClockReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case UPDATE_TIMEZONES:
            return {
                ...state,
                timezones: action.timezones
            }
            break;
        case UPDATE_TIME: 
            return {
                ...state,
                time: action.time
            }
        case SET_FETCH:
            return {
                ...state,
                isFetching: action.fetchState
            }
    
        default:
            return state
            break;
    }
}

export const updateTimezones = (timezones) => ({type: UPDATE_TIMEZONES, timezones});
export const updateTime = (time) => ({type: UPDATE_TIME, time});
export const setFetch = (fetchState) => ({type: SET_FETCH, fetchState});

export default ClockReducer;