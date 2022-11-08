import React from "react";
import {route} from "../routes/Route";
import {Switch, Route, Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Navbar from "./pages/Navbar";

const AppRoute= () => {
    const history = useHistory()
    return (
        <>
        <Navbar />
        <Switch>
            {route.map((route)=> 
                <Route key={route.path} component={route.component} path={route.path} exact/>
            )}
            <Redirect to='/' />
        </Switch>
        </>
        
    );

}

export default AppRoute