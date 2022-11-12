const initialState ={
    events:[]
}

export const EventReducer = (event = initialState, action) => {
    switch (action.type) {
        case 'getEvets':
            return {...event, events:action.payload}
    
        default:
            return event
    }
}