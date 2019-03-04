import React, { Component } from "react";
//import {Redirect} from 'react-router-dom';
//import {PostData} from '../../services/PostData';
import "./Login.css";
import Logo from "../../images/dsoa-logo-white.png";
//import Background from "../../images/login-bg.jpg";

class Login extends Component {
  /*
  constructor(){
    super();
   
    this.state = {
     username: '',
     password: '',
     redirectToReferrer: false
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  

  login() {
    if(this.state.username && this.state.password){
      PostData('login',this.state).then((result) => {
       let responseJson = result;
       if(responseJson.userData){         
         sessionStorage.setItem('userData',JSON.stringify(responseJson));
         this.setState({redirectToReferrer: true});
       }
       
      });
    }
    
  } */

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    /*
     if (this.state.redirectToReferrer) {
      return (<Redirect to={'/home'}/>)
    }
   
    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'}/>)
    }
*/
    return (
      <div
        className="container-fluid login-container"
        
      >
        <div className="hero-brand-div">
          <a className="hero-brand" href="./" title="Home">
            <img className="hero-brand-resize" alt="DSOA Logo" src={Logo} />
          </a>
        </div>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <h1 className="web-name">Weather Warning System</h1>
            <div className="card card-login my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Log In</h5>
                <form className="form-login">
                  <div className="form-label-group">
                    <input
                      name="username"
                      type="text"
                      id="inputUsername"
                      className="form-control"
                      placeholder="Username"
                      pattern="[A-Za-z0-9]{1,20}"
                      title="Username must only consist of letters and numbers"
                      required
                      autoFocus
                    />
                    <label htmlFor="inputUsername">Username</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      name="password"
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      required
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                      Remember password
                    </label>
                  </div>
                  <button
                    className="btn btn-lg btn-success btn-block text-uppercase"
                    type="submit"
                  >
                    Log in
                  </button>
                  <p className="text-center register-label">
                    Not yet registered? <a href="/signup">Sign Up</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer>
      <p>
      &#xA9; 2019 Weather Warning System, DSOA.
      </p>
      </footer>
      </div>
    );
  }
}

export default Login;
