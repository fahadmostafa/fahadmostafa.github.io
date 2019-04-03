import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../userFunctions";
import "./Login.css";
import Logo from "../../images/dsoa-logo-white.png";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      redirectToReferrer: false,
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    if (this.state.username && this.state.password) {
      e.preventDefault();

      const user = {
        username: this.state.username,
        password: this.state.password
      };

      login(user).then(res => {
        if (res === undefined) {
          window.alert("Wrong Username or Password");
        } else {
          this.setState({ redirectToReferrer: true });
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={"/home"} />;
    }

    if (localStorage.getItem("usertoken")) {
      return <Redirect to={"/home"} />;
    }
    if (localStorage.getItem("admintoken")) {
      return <Redirect to={"/adminhome"} />;
    }
    return (
      <div className="container-fluid login-container">
        <div className="hero-brand-div">
          <a className="hero-brand" href="./" title="Home">
            <img className="hero-brand-resize" alt="DSOA Logo" src={Logo} />
          </a>
        </div>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <h1 className="web-name">Weather Warning System</h1>
            <form onSubmit={this.onSubmit}>
              <div className="card card-login my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Log In</h5>
                  <p className="text-center text-danger">
                    Note: Do not log out unless there is a change in shift. In
                    that case, the next person must log in.
                  </p>
                  <div className="form-label-group">
                    <input
                      name="username"
                      onChange={this.onChange}
                      type="text"
                      value={this.state.username}
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
                      value={this.state.password}
                      onChange={this.onChange}
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
                  <input
                    type="submit"
                    value="Log In"
                    className="btn btn-lg btn-success btn-block text-uppercase"
                  />
                  <p className="text-center register-label">
                    Not yet registered? <a href="/signup">Sign Up</a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <footer>
          <p>&#xA9; 2019 Weather Warning System, DSOA.</p>
        </footer>
      </div>
    );
  }
}

export default Login;
