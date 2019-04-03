import React, { Component } from "react";
import "./App.css";
import "./styles/custom.css";
import Routes from "./routes";

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
        
          <Routes name={this.state.appName} />
        
          
      </div>
    );
  }
}

export default App;
