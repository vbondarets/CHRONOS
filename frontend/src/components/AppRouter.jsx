import React from 'react';
// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../router';
// import { AuthContext } from './context';

const AppRouter = () => {
    const isAuth = useSelector(state => state.status);
    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Redirect to='/' />
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Redirect to='/login' />
            </Switch>


    )
}

export default AppRouter