const IntialState = {
    allCalendars:[],
    AllCalendarsById:[]
}

export const CalendarReducer = (calendar = IntialState, action) => {
    switch (action.type) {
        case 'getCalendarById':
            return {...calendar, AllCalendarsById:action.payload}
        default:
            return calendar;
    }
}