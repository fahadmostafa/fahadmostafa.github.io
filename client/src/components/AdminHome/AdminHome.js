import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../images/dsoa-logo-white.png";
import jwt_decode from "jwt-decode";
import $ from "jquery";
import "./AdminHome.css";

class AdminHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminName: "",
      username: "",
      errors: {},
      redirectToReferrer: false
    };
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("admintoken");
    this.setState({ redirectToReferrer: true });
  }

  componentDidMount() {
    if (localStorage.admintoken === undefined) {
      this.setState({ redirectToReferrer: true });
    } else {
      const token = localStorage.admintoken;
      const decoded = jwt_decode(token);
      this.setState({
        adminName: decoded.admin_name,
        username: decoded.admin_username
      });
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={"/"} />;
    }

    if (localStorage.getItem("usertoken")) {
      return <Redirect to={"/home"} />;
    }
    return (
      <div>
        <div className="d-flex" id="wrapper">
          {/* Sidebar */}
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="container-fluid justify-content-center brand-box">
              <img className="home-brand-resize" alt="DSOA Logo" src={Logo} />
            </div>
            <div className="list-group list-group-flush">
              <a
                href="/adminhome"
                className="list-group-item list-group-item-action bg-light"
              >
                Home
              </a>
              <a
                href="/log"
                className="list-group-item list-group-item-action bg-light"
              >
                Log
              </a>
              <a
                href="/usersinfo"
                className="list-group-item list-group-item-action bg-light"
              >
                Users data
              </a>
            </div>
          </div>
          {/* /#sidebar-wrapper */}

          {/* Page Content */}
          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <button className="btn btn-primary" id="menu-toggle">
                Menu
              </button>
              <button
                className="btn btn-dark log-out-btn"
                type="submit"
                onClick={this.logout}
              >
                Log out
              </button>
            </nav>

            <div className="container-fluid">
              <div className="col-sm home-title-div">
                <h1 className="admin-home-title">
                  Weather Warning System - Admin Home
                </h1>
                <h6>You are logged in as {this.state.adminName}</h6>
              </div>
              <div className="btn-box">
                <button
                  type="button"
                  className="btn btn-warning btn-lg btn-warn"
                  data-toggle="modal"
                  data-target="#sendWarningChecklist"
                >
                  Send a Warning
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg btn-alert"
                >
                  Send an Alert
                </button>
              </div>
            </div>
          </div>
          {/* /#page-content-wrapper */}
        </div>

        <div
          className="modal fade"
          id="sendWarningChecklist"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ChangePlotNumberModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="changePlotNo">
                  Change Plot Number
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-label-group">
                  <div className="form-group">
                    <label htmlFor="plot">
                      Plot no you are currently assigned in:
                    </label>
                    <select
                      className="form-control"
                      id="plot"
                      name="plotNo"
                      onChange={this.onChange}
                    >
                      <option>04-003</option>
                      <option>06-020</option>
                      <option>10-001</option>
                      <option>10-003</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
