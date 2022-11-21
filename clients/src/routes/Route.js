import AllCalendarsPage from "../components/pages/CalendarComponents/AllCalendarsPage";
import Create_Page from "../components/pages/CalendarComponents/CreateEventComponent";
import EventPage from "../components/pages/CalendarComponents/EventFromCalendars";
import DayPage from "../components/pages/DayComponent/DayPage";
import HomePage from "../components/pages/Homepage";
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";
import ResetPassword from "../components/pages/ResetPassword";
import SubmitSharingCalendar from "../components/pages/Sharing/SubmitCalendarSharing";
import TokenReset from "../components/pages/TokenConfirm";

export const route = [
    {
        path:'/register', component:RegisterPage,exact:true
    },
    {
        path:'/login', component:LoginPage,exact:true
    },
    {
        path:`/reset-password`, component: ResetPassword, exact:true
    },
    {
        path:`/reset-password/:confirm_token`, component: TokenReset, exact:true
    },
    {
        path: '/home', component:HomePage, exact:true
    },
    {
        path:'/calendar', component:AllCalendarsPage, exact:true
    },
    {
        path:'/calendar/:calendar_id', component:EventPage, exact:true
    },
    {
        path:'/calendar/:calendar_id/create_event', component:Create_Page, exact:true
    },
    {
        path:'/calendar/:calendar_id/day/:day', component:DayPage, exact:true
    },
    {
        path:'/share/:token', component:SubmitSharingCalendar, exact:true
    }
    // ,
    // {
    //     path:'/share', component:SubmitSharingCalendar, exact:true
    // }
]
export const privateRoute = [
    {
        path: '/home', component:HomePage, exact:true
    },
    {
        path:'/calendar', component:AllCalendarsPage, exact:true
    },
    {
        path:'/calendar/:calendar_id', component:EventPage, exact:true
    },
    {
        path:'/calendar/:calendar_id/create_event', component:Create_Page, exact:true
    },
    {
        path:'/calendar/:calendar_id/day/:day', component:DayPage, exact:true
    },
    {
        path:'/share/:token', component:SubmitSharingCalendar, exact:true
    }
]
export const publicRoute = [
    {
        path:'/register', component:RegisterPage,exact:true
    },
    {
        path:'/login', component:LoginPage,exact:true
    },
    {
        path:`/reset-password`, component: ResetPassword, exact:true
    },
    {
        path:`/reset-password/:confirm_token`, component: TokenReset, exact:true
    },
    {
        path:'/share/:token', component:SubmitSharingCalendar, exact:true
    }

]

