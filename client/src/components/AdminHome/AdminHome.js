import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { checklist } from "../userFunctions";
import { getdata } from "../userFunctions";
import { senddata } from "../userFunctions";
import { deletedata } from "../userFunctions";
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
      warning: "warning",
      alert: "alert",
      errors: {},
      checklistData: [],
      selectedChecklistData: [],
      warningSent: false,
      redirectToReferrer: false
    };
    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitAlert = this.onSubmitAlert.bind(this);
    this.onCancelWarning = this.onCancelWarning.bind(this);
    this.onCancelAlert = this.onCancelAlert.bind(this);
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
      checklist()
        .then(res => {
          this.setState({ checklistData: res });
        })
        .catch(err => {
          console.log("Error loading checklist data");
        });
      senddata()
        .then(res => {
          if (Object.keys(res).length === 0) {
            this.setState({ warningSent: false });
            this.setState({ alertSent: false });
          } else {
            if (res[0].warning_type === "warning") {
              this.setState({ warningSent: true });
            } else {
              if (res[0].warning_type === "alert") {
                this.setState({ alertSent: true });
              } else {
                window.alert("Something went wrong! Try refreshing the page.");
              }
            }
          }
        })
        .catch(err => {
          console.log("Cannot check status of warning/alert");
        });
    }
  }

  onSubmit(e) {
    if (Object.keys(this.state.selectedChecklistData).length === 0) {
      e.preventDefault();
      window.alert("Select at least one activity to send as a warning.");
    } else {
      e.preventDefault();

      const warningDate = Date();

      const dataArr = {
        selectedChecklistData: this.state.selectedChecklistData.join(),
        warning: this.state.warning,
        warningDate: warningDate
      };

      getdata(dataArr)
        .then(res => {
          if (res.error || !res) {
            window.alert(
              "Cannot send a warning! Cancel the previous one first."
            );
            $(".close").click();
          } else {
            window.alert(
              "Warning has been sent. Check log for feedback from the sites."
            );
            this.setState({ warningSent: true });
            window.location.reload();
          }
        })
        .catch(err => {
          console.log("No response");
        });
    }
  }

  onSubmitAlert(e) {
    if (this.state.warningSent) {
      e.preventDefault();
      window.alert("Cancel the warning first before sending an alert");
    } else {
      e.preventDefault();

      const warningDate = Date();

      const dataArr = {
        selectedChecklistData:
          "All activities must be stopped immediately. BAD WEATHER!!!",
        warning: this.state.alert,
        warningDate: warningDate
      };

      getdata(dataArr)
        .then(res => {
          if (res.error || !res) {
            window.alert(
              "Cannot send an alert! Cancel the previous one first."
            );
          } else {
            window.alert(
              "Alert has been sent. Check log for feedback from the sites."
            );
            this.setState({ alertSent: true });
          }
        })
        .catch(err => {
          console.log("No response");
        });
    }
  }

  onCancelWarning(e) {
    e.preventDefault();
    deletedata()
      .then(res => {
        if (res.success) {
          window.alert("The warning has been cancelled");
        } else {
          if (res.error) {
            window.alert("Nothing to cancel");
          }
        }
      })
      .catch(err => {
        console.log("Could not cancel due to an unexpected error.");
      });
    this.setState({ warningSent: false });
  }

  onCancelAlert(e) {
    e.preventDefault();
    deletedata()
      .then(res => {
        if (res.success) {
          window.alert("The alert has been cancelled");
        } else {
          if (res.error) {
            window.alert("Nothing to cancel");
          }
        }
      })
      .catch(err => {
        console.log("Could not cancel due to an unexpected error.");
      });
    this.setState({ alertSent: false });
  }

  onChange(e) {
    if (this.state.selectedChecklistData) {
      const selectedChecklistData = this.state.selectedChecklistData;
      let i;

      if (e.target.checked) {
        selectedChecklistData.push(e.target.value);
      } else {
        i = selectedChecklistData.indexOf(e.target.value);
        selectedChecklistData.splice(i, 1);
      }

      this.setState({ selectedChecklistData: selectedChecklistData });
    } else {
      console.log("Error 404 not found");
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
          <div id="page-content-wrapper" className="admin-back">
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
                  Warning System
                </h1>
                <h6>You are logged in as {this.state.adminName}</h6>
              </div>
              <div className="btn-box">
                {this.state.warningSent ? (
                  <button
                    type="button"
                    className="btn btn-warning btn-lg btn-warn"
                    onClick={this.onCancelWarning}
                  >
                    Cancel Warning
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-warning btn-lg btn-warn"
                    data-toggle="modal"
                    data-target="#sendWarningChecklist"
                  >
                    Send a Warning
                  </button>
                )}
                {this.state.alertSent ? (
                  <button
                    type="button"
                    className="btn btn-danger btn-lg btn-alert"
                    onClick={this.onCancelAlert}
                  >
                    Cancel Alert
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={this.onSubmitAlert}
                    className="btn btn-danger btn-lg btn-alert"
                  >
                    Send an Alert
                  </button>
                )}
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
                  Select the list of activities to be taken care of
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
                <form onSubmit={this.onSubmit}>
                  <div>
                    {this.state.checklistData ? (
                      <div className="form-check">
                        {this.state.checklistData.map((item, key) => {
                          return (
                            <label
                              className="checkbox-label form-check-label"
                              key={key}
                            >
                              <input
                                type="checkbox"
                                className="form-check-input"
                                value={item.checklist_item}
                                onChange={this.onChange}
                                title="Please check at least one box to send a warning."
                              />
                              {item.checklist_item}-{" "}
                              {item.condition_id === 1
                                ? "Rain"
                                : item.condition_id === 2
                                ? "Visibility"
                                : item.condition_id === 3
                                ? "Wind Speed"
                                : item.condition_id === 4
                                ? "High Temperature"
                                : " "}
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <div> Loading ... {window.location.reload()}</div>
                    )}
                  </div>
                  <div className="warning-send-final-btn">
                    <input
                      type="submit"
                      value="Send Warning"
                      className="btn btn-warning "
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
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
