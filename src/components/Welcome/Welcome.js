import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import "./Welcome.css";

class Welcome extends Component {
  onClickSignup(){
    window.location.href='/signup';
  }

  onClickLogin(){
    window.location.href="/login";
  }

  render() {
    return (
      <div className='text-center'>
      <div className='row header-setting'>
          <div className='col'><h1 className="display-4" id='myh1'>Weather Warning System - <h1 className='display-4' id='myh1-2'>DSOA</h1></h1></div>
      </div>
      <div className='row btn-bar justify-content-center'>
        <div className='col btn-group'>
          <button onClick={this.onClickLogin} className='btn btn-lg btn-success'>
              Login
          </button>
          <button onClick={this.onClickSignup} className='btn btn-lg btn-danger'>
              Signup
          </button>
        </div>
      </div>
      </div>
    );
  }
}

export default Welcome;
