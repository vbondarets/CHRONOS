const IntialState = {
    allCalendars:[],
    AllCalendarsById:[],
    sharingCalendar:[],
    submitSharingCalendar: [],
    allUsers:[],
    author:[]
}

export const CalendarReducer = (calendar = IntialState, action) => {
    switch (action.type) {
        case 'getAllCalendar':
            return {...calendar, allCalendars: action.payload}
        case 'getCalendarById':
            return {...calendar, AllCalendarsById:action.payload}
        case 'getUsersOnCalendar':
            return {...calendar, allUsers: action.payload}
        case 'getAuthor':
            return {...calendar, author: action.payload}
        
        
        case 'shareCalendar': 
            return {...calendar, sharingCalendar:action.payload}
        case 'submitSharingCalendar': 
            return {...calendar, submitSharingCalendar: action.payload}
        case 'createCalendar':
            return {...calendar, AllCalendarsById: action.payload}
        case 'importCalendar':
            return {...calendar, AllCalendarsById: action.payload}
        case 'hideCalendar':
            return {...calendar, AllCalendarsById: action.payload}
        case 'updareCalendar':
            return {...calendar, AllCalendarsById: action.payload}
        case 'deleteCalendar':
            return {...calendar, AllCalendarsById:action.payload}
        case 'deleteUser':
            return {...calendar, allUsers: action.payload}
        default:
            return calendar;
    }
}