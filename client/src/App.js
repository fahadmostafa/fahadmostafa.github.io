import React, { Component } from "react";
import "./App.css";
import "./styles/custom.css";
import { Route, Switch } from "react-router-dom";

import Welcome from "././components/Welcome/Welcome";
import Home from "././components/Home/Home";
import Login from "././components/Login/Login";
import ErucesadminngisUp from "././components/ErucesadminngisUp/ErucesadminngisUp";
import AdminLogin from "././components/AdminLogin/AdminLogin";
import AdminHome from "./components/AdminHome/AdminHome";
import Log from "./components/Log/Log";
import UsersInfo from "./components/UsersInfo/UsersInfo";
import Signup from "././components/Signup/Signup";
import NotFound from "././components/NotFound/NotFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "Weather Warning System - DSOA"
    };
  }

  render() {
    return (
      <div className="main-contain">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/ErucesadminngisUp" component={ErucesadminngisUp} />
          <Route path="/adminlogin" component={AdminLogin} />
          <Route path="/adminhome" component={AdminHome} />
          <Route path="/log" component={Log} />
          <Route path="/usersinfo" component={UsersInfo} />
          <Route path="/Signup" component={Signup} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
