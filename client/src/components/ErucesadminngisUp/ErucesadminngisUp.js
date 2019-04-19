import React, { Component } from "react";
import { adminsignup } from "../userFunctions";
// import "../Signup/Signup.css";

class ErucesadminngisUp extends Component {
  constructor() {
    super();

    this.state = {
      adminName: "",
      username: "",
      password: "",
      errors: {},
      redirectToReferrer: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    if (this.state.adminName && this.state.username && this.state.password) {
      e.preventDefault();

      const newAdmin = {
        adminName: this.state.adminName,
        username: this.state.username,
        password: this.state.password
      };

      adminsignup(newAdmin).then(res => {
        if (res.error) {
          window.alert("Username already taken");
        } else {
          window.alert("Successfully registered.");
          this.props.history.push(`/adminlogin`);
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container-fluid signup-container">
        <div className="hero-brand-div" />
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signup my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <form className="form-signup" onSubmit={this.onSubmit}>
                  <div className="form-label-group">
                    <input
                      name="adminName"
                      value={this.state.adminName}
                      onChange={this.onChange}
                      className="form-control"
                      id="inputAdminName"
                      placeholder="Name"
                      type="text"
                      pattern="[A-Za-z ]{1,50}"
                      title="Name can only be in letters."
                      required
                      autoFocus
                    />
                    <label htmlFor="inputAdminName">Name</label>
                    <span className="note">
                      Note: It will be sufficient if only the first 2 names are
                      provided.
                    </span>
                  </div>
                  <div className="form-label-group">
                    <input
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                      type="text"
                      id="inputUsername"
                      className="form-control"
                      placeholder="Username"
                      pattern="[A-Za-z0-9]{1,20}"
                      title="Username must only consist of letters and numbers"
                      required
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
                    value="Sign Up"
                    className="btn btn-lg btn-danger btn-block text-uppercase"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <p>&#xA9; 2019 Weather Warning System, DSOA.</p>
        </footer>
      </div>
    );
  }
}

export default ErucesadminngisUp;
