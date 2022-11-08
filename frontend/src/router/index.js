// import Admin from "../pages/Admin";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import UserId from "../pages/UserId";

export const publicRoutes = [
    {path: "/login", component: Login, exact: true},
    {path: "/register", component: Register, exact: true},
    {path: "/error", component: Error, exact: true},
];

export const privateRoutes = [
    {path: "/error", component: Error, exact: true},
    {path: "/", component: Home, exact: true},
];

export const adminRoutes = [
    // {path: "/admin", component: Admin, exact: true},
];

