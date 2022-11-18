const IntialState = {
    allCalendars:[],
    AllCalendarsById:[],
    sharingCalendar:[],
    submitSharingCalendar: []
}

export const CalendarReducer = (calendar = IntialState, action) => {
    switch (action.type) {
        case 'getCalendarById':
            return {...calendar, AllCalendarsById:action.payload}
        case 'shareCalendar': 
            return {...calendar, sharingCalendar:action.payload}
        case 'submitSharingCalendar': 
            return {...calendar, submitSharingCalendar: action.payload}
        case 'deleteCalendar':
            return {...calendar, AllCalendarsById:action.payload}
        default:
            return calendar;
    }
}