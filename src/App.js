import React, { Component } from "react";
import "./App.css";
import "./styles/custom.css";
import Routes from "./routes";

import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "Weather Warning System - DSOA"
    };
  }
  render() {
    return (
      <div className='container-fluid'>
        <div>
          <Routes name={this.state.appName} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
