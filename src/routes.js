import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Welcome from '././components/Welcome/Welcome';
import Home from '././components/Home/Home';
import Login from '././components/Login/Login';
import AdminLogin from '././components/AdminLogin/AdminLogin';
import Signup from '././components/Signup/Signup';
import NotFound from '././components/NotFound/NotFound';


const Routes = () => (
<BrowserRouter >
<Switch>
<Route exact path="/" component={Welcome}/>
<Route path="/home" component={Home}/>
<Route path="/login" component={Login}/>
<Route path="/adminlogin" component={AdminLogin}/>
<Route path="/Signup" component={Signup}/>
<Route path="*" component={NotFound}/>
</Switch>
</BrowserRouter>
);
export default Routes;