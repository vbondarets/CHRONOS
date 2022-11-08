import React from "react";
import {BrowserRouter} from "react-router-dom" 
import AppRoute from "./components/AppRoute";
import { useHistory } from "react-router-dom";
import "./components/style/pagestyle.css"
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode'

const App = () =>{
  const dispatch = useDispatch()
  const store = useSelector(store => store)
  const token = Cookies.get('token')
  
  if (token === undefined) {
    store.Auth.token = ''
  }
  else {
    store.Auth.token = token
  }
  const history = useHistory()
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
