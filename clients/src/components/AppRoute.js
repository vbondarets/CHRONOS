import React from "react";
import {privateRoute, publicRoute, route} from "../routes/Route";
import {Switch, Route, Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Navbar from "./pages/Navbar";

const AppRoute= () => {
    const history = useHistory()
    const isAuth = false;
    if(isAuth){
        return (
            <>
            <Navbar />
            <Switch>
                {privateRoute.map((route)=> 
                    <Route key={route.path} component={route.component} path={route.path} exact/>
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
                {publicRoute.map((route)=> 
                    <Route key={route.path} component={route.component} path={route.path} exact/>
                )}
                <Redirect to='/login' />
            </Switch>
            </>
        );
    }
    

}

export default AppRoute