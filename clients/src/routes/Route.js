import HomePage from "../components/pages/Homepage";
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";
import ResetPassword from "../components/pages/ResetPassword";
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
        path: '/', component:HomePage, exact:true
    }
]

