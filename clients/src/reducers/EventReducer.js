const initialState ={
    events:[],
    latestEvents:[]
}

export const EventReducer = (event = initialState, action) => {
    switch (action.type) {
        case 'getEvets':
            return {...event, events:action.payload}
        case 'getLatestEvents':
            return {...event, latestEvents:action.payload}
        case 'createEvent': 
            return {...event, events:action.payload}
        default:
            return event
    }
}