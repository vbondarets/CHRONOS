const initialState ={
    events:[],
    latestEvents:[],
    eventId:[]
}

export const EventReducer = (event = initialState, action) => {
    switch (action.type) {
        case 'getEvets':
            return {...event, events:action.payload}
        case 'getEventById':
            return {...event, eventId: action.payload}
        case 'getLatestEvents':
            return {...event, latestEvents:action.payload}
        case 'sortbyType':
            return {...event, events:action.payload}
        case 'createEvent': 
            return {...event, events:action.payload}
        case 'shareEvent':
            return {...event, events:action.payload}
        case 'deleteEvent': 
            return {...event, events:action.payload}
        default:
            return event
    }
}