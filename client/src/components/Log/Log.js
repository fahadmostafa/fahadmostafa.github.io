import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../images/dsoa-logo-white.png";
import { log } from "../userFunctions";
import jwt_decode from "jwt-decode";
import $ from "jquery";
import "./Log.css";

class Log extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminName: "",
      username: "",
      errors: {},
      tableData: [],
      redirectToReferrer: false
    };
    this.logout = this.logout.bind(this);
    this.getLog = this.getLog.bind(this);
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

      this.getLog();
      this.update = setInterval(() => {
        this.getLog();
      }, 4000);
    }
  }

  getLog = () => {
    log()
      .then(res => {
        this.setState({ tableData: res });
      })
      .catch(err => {
        console.log("Error loading table data");
      });
  };

  componentWillUnmount() {
    clearInterval(this.update);
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
                <h1 className="admin-log-title">
                  Weather Warning System - Log{" "}
                </h1>
              </div>
              <div className="table-div">
              <div className="justify-content-center">
                <label>&larr; scroll if the table is not completely visible &rarr;</label>
              </div>
                <table className="table table-striped" id="log-table">
                  <thead className="thead-light">
                    <tr>
                      <th>Log ID</th>
                      <th>Contractor ID</th>
                      <th>Contractor Plot No.</th>
                      <th>Feedback Received Timestamp</th>
                      <th>Warning Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableData.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{item.log_id}</td>
                          <td>{item.warden_identity}</td>
                          <td>{item.plot_no}</td>
                          <td>{item.feedback_rec_time}</td>
                          <td>{item.warning_date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="justify-content-center">
                <label>&larr; scroll if the table is not completely visible &rarr;</label>
              </div>
            </div>
          </div>
          {/* /#page-content-wrapper */}
        </div>
      </div>
    );
  }
}

export default Log;
