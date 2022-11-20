import React from "react";
import { privateRoute, publicRoute, route } from "../routes/Route";
import { Switch, Route, Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Navbar from "./pages/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

const AppRoute = () => {
    const history = useHistory()
    const [isAuth, setIsAuth] = useState(false);
    const store = useSelector(store => store)
    // const token = Cookies.get('token')


    useEffect(() => {
        if (store.Auth.token === ''|| !store.Auth.token) {
            return;
        }
        else {
            // store.Auth.token = token
            setIsAuth(true)
        }


    }, [store.Auth.token])
    if (isAuth) {
        return (
            <>
                <Navbar />
                <Switch>
                    {privateRoute.map((route) =>
                        <Route key={route.path} component={route.component} path={route.path} exact />
                    )}
                    <Redirect to='/home' />
                </Switch>
            </>

        );
    }
    else {
        return (
            <>
                <Navbar />
                <Switch>
                    {publicRoute.map((route) =>
                        <Route key={route.path} component={route.component} path={route.path} exact />
                    )}
                    <Redirect to='/login' />
                </Switch>
            </>
        );
    }


}

export default AppRoute