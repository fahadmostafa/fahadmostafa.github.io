import React, { Component } from "react";
import Background from "../../images/welcomebg.jpg";
import Logo from "../../images/dsoa_logo.png";
import "./Welcome.css";

class Welcome extends Component {

  constructor(props) {
    super(props);

    this.onClickSignup = this.onClickSignup.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickAdminLogin = this.onClickAdminLogin.bind(this);
  }
  onClickSignup() {
    window.location.href = "/signup";
  }

  onClickLogin() {
    window.location.href = "/login";
  }

  onClickAdminLogin() {
    window.location.href = "/adminlogin";
  }

  render() {
    return (
      <div>
        <div className="hero" style={{ backgroundImage: `url(${Background})` }}>
          <div className="container text-center">
            <div className="row">
              <div className="col-md-12">
                <a className="hero-brand" href="./" title="Home">
                  <img alt="DSOA Logo" src={Logo} />
                </a>
              </div>
            </div>

            <div className="col-md-12">
              <h1 className="web-name">Weather Warning System</h1>

              <p className="tagline">
                Please login to view user dashboard or signup if you don't have
                an account.
              </p>
              <div className="btn-group btn-style">
                <button
                  type="button"
                  onClick={this.onClickLogin}
                  className="btn btn-lg btn-success"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={this.onClickSignup}
                  className="btn btn-lg btn-danger"
                >
                  Signup
                </button>
              </div>
              
            </div>
            <button type="button" onClick={this.onClickAdminLogin} className="btn btn-sm btn-secondary btn-admin">Admin</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
