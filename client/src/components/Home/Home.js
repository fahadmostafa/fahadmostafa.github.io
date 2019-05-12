import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { senddata } from "../userFunctions";
import { acksend } from "../userFunctions";
import { log } from "../userFunctions";
import "./Home.css";
import Logo from "../../images/dsoa-logo-white.png";
import WarningLift from "../../images/flagWarningLift.png";
import WarningCooling from "../../images/flagWarningCooling.png";
import WarningCover from "../../images/flagWarningCover.png";
import WarningElectric from "../../images/flagWarningElectric.png";
import WarningElevation from "../../images/flagWarningElevation.png";
import WarningFence from "../../images/flagWarningFence.png";
import WarningMachineries from "../../images/flagWarningMachineries.png";
import WarningMidday from "../../images/flagWarningMidday.png";
import WarningPest from "../../images/flagWarningPest.png";
import WarningPuddle from "../../images/flagWarningPuddle.png";
import WarningSummer from "../../images/flagWarningSummer.png";
import WarningWaste from "../../images/flagWarningWaste.png";
import WarningWater from "../../images/flagWarningWater.png";
import Weather from "../../images/Weather.png";
import Alert from "../../images/flagRed.png";
import Warning from "../../images/flagWarning.png";
import NoWarning from "../../images/flagGreen.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: 0,
      wardenName: "",
      username: "",
      contact: "",
      contractorName: "",
      contractorEmail: "",
      contractorContact: "",
      consultantName: "",
      plotNo: "",
      errors: {},
      warningFlag: false,
      alertFlag: false,
      warningData: "",
      warningRecDate: "",
      warningType: "",
      ackCheck: false,
      acknowledgeFlag: false,
      redirectToReferrer: false
    };
    this.logout = this.logout.bind(this);
    this.getWarning = this.getWarning.bind(this);
    this.sendAck = this.sendAck.bind(this);
    this.ackButtonUpdate = this.ackButtonUpdate.bind(this);
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.setState({ redirectToReferrer: true });
  }

  componentDidMount() {
    if (localStorage.usertoken === undefined) {
      this.setState({ redirectToReferrer: true });
    } else {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        userid: decoded.warden_id,
        wardenName: decoded.warden_name,
        username: decoded.warden_username,
        contact: decoded.contact,
        contractorName: decoded.contractorName,
        contractorEmail: decoded.contractorEmail,
        contractorContact: decoded.contractorContact,
        consultantName: decoded.contractorName,
        plotNo: decoded.plot_number
      });

      this.getWarning();
      this.update = setInterval(() => {
        this.getWarning();
      }, 6000);

      if (this.state.warningRecDate === "") {
        setTimeout(() => {
          this.ackButtonUpdate();
        }, 1000);
      } else {
        this.ackButtonUpdate();
      }
    }
  }

  ackButtonUpdate = () => {
    log()
      .then(res => {
        let wardenCheck = 0;
        let dateCheck = "";

        for (let i of res) {
          wardenCheck = i.warden_identity;
          dateCheck = i.warning_date;

          if (
            dateCheck === this.state.warningRecDate &&
            wardenCheck === this.state.userid
          ) {
            this.setState({ ackCheck: true });
            this.setState({ acknowledgeFlag: true });
            break;
          } else {
            this.setState({ ackCheck: true });
            this.setState({ acknowledgeFlag: false });
          }
        }
      })
      .catch(err => {
        console.log("Cannot check for acknowledgement status");
      });
  };

  getWarning = () => {
    senddata()
      .then(res => {
        if (Object.keys(res).length === 0) {
          this.setState({ warningFlag: false });
          this.setState({ alertFlag: false });
          this.setState({ acknowledgeFlag: false });
        } else {
          if (res[0].warning_type === "warning") {
            let dataArr = res[0].checklist_item;
            dataArr = dataArr.split(",");
            this.setState({ warningRecDate: res[0].warning_date });
            this.setState({ warningData: dataArr });
            this.setState({ warningFlag: true });
          } else {
            if (res[0].warning_type === "alert") {
              this.setState({ warningRecDate: res[0].warning_date });
              this.setState({ warningData: res[0].checklist_item });
              this.setState({ alertFlag: true });
            } else {
              window.alert("Something went wrong! Try refreshing the page.");
            }
          }
        }
      })
      .catch(err => {
        console.log("Cannot connect to get warning data");
      });
  };

  sendAck(e) {
    e.preventDefault();
    const acknowledgeDate = Date();

    const ackArr = {
      userid: this.state.userid,
      userPlotNo: this.state.plotNo,
      acknowledgeDate: acknowledgeDate,
      warningRecDate: this.state.warningRecDate
    };

    acksend(ackArr)
      .then(res => {
        this.setState({ acknowledgeFlag: true });
      })
      .catch(err => {
        console.log("Cannot acknowledge!");
      });
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={"/"} />;
    }
    if (localStorage.getItem("admintoken")) {
      return <Redirect to={"/adminhome"} />;
    }

    let counter = 0;
    return (
      <div className="container-fluid back">
        <div className="row">
          <div className="col-sm home-brand-div">
            <img className="home-brand-resize" alt="DSOA Logo" src={Logo} />
          </div>
          <div className="col-sm home-title-div">
            <h1 className="home-title">Warning System</h1>
            <h6>You are logged in as {this.state.wardenName}</h6>
          </div>
          <div className="col-sm plot-btn-div">
            <button
              type="button"
              className="btn btn-danger btn-sm plot-btn"
              data-toggle="modal"
              data-target="#changePlotNo"
            >
              Change Plot No
            </button>
            <button
              className="btn btn-sm btn-dark log-out-btn"
              type="submit"
              onClick={this.logout}
            >
              Log out
            </button>
          </div>
        </div>
        {/*  */}
        {this.state.warningFlag ? (
          <div>
            {this.state.warningData.map((item, key) => {
              return (
                <div className="row justify-content-center" key={key}>
                  {(counter = counter + 1)}
                  <div className="col-8 content-box warning-box">
                    <div className="row">
                      <div className="col-3 flag-box align-self-center">
                        <img
                          className="img-warning"
                          alt="Yellow Flag"
                          src={
                            item === "Stop Work on elevation (using cradles)"
                              ? WarningElevation
                              : item ===
                                "Maintain the regular disposal of garbage to avoid air contamination"
                              ? WarningWaste
                              : item === "Cover all the stored materials"
                              ? WarningCover
                              : item === "Secure all the electric connections"
                              ? WarningElectric
                              : item === "Remove stagnant water"
                              ? WarningPuddle
                              : item === "Conduct pest control (after rain)"
                              ? WarningPest
                              : item === "Stop all the lifting operation" ||
                                item === "Stop the lifting operation"
                              ? WarningLift
                              : item ===
                                "Earth moving machineries to be stopped"
                              ? WarningMachineries
                              : item === "Maintain the external fence"
                              ? WarningFence
                              : item === "Stock pile to be covered properly"
                              ? WarningCover
                              : item ===
                                "Implement the circular for Mid-Day Break"
                              ? WarningMidday
                              : item ===
                                "Suspend all work activities from 15th Jun 2019 to 15th Sept 2019 (12:30 PM - 3:00 PM)"
                              ? WarningSummer
                              : item ===
                                "Provide adequate drinking water facility at site"
                              ? WarningWater
                              : item ===
                                "Provide the adequate cooling mechanism at site"
                              ? WarningCooling
                              : Warning
                          }
                        />
                      </div>
                      <div className="col align-self-center">
                        <img
                          className="weather-type"
                          alt="Type of weather condition"
                          src={Weather}
                        />
                      </div>
                      <div className="col-md-6 align-self-center">
                        <p className="warning-description">{item}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {this.state.ackCheck ? (
              this.state.acknowledgeFlag ? (
                <div className="col-md-6 offset-md-3 ack-box">
                  <label className="ack-text">
                    Your acknowledgement has been received.
                  </label>
                </div>
              ) : (
                <div className="col-md-6 offset-md-3 ack-box">
                  <p className="text-danger ack-text">
                    I hereby acknowledge that appropriate actions were taken
                    infavour of the above warnings received.
                  </p>
                  <button
                    type="button"
                    className="btn btn-lg btn-success ack-btn"
                    onClick={this.sendAck}
                  >
                    Acknowledge
                  </button>
                </div>
              )
            ) : (
              <div className="col-md-6 offset-md-3 ack-box">
                <label className="ack-text">Loading ... Please Wait.</label>
              </div>
            )}
          </div>
        ) : this.state.alertFlag ? (
          <div>
            <div className="row justify-content-center">
              <div className="col-8 content-box alert-box">
                <div className="row">
                  <div className="col-md-auto flag-box align-self-center">
                    <img className="img-alert" alt="Red Flag" src={Alert} />
                  </div>
                  <div className="col align-self-center">
                    <p className="alert-description">
                      All activities must be stopped immediately. BAD WEATHER!!!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {this.state.ackCheck ? (
              this.state.acknowledgeFlag ? (
                <div className="col-md-6 offset-md-3 ack-box">
                  <label className="ack-text">
                    Your acknowledgement has been received.
                  </label>
                </div>
              ) : (
                <div className="col-md-6 offset-md-3 ack-box">
                  <p className="text-danger ack-text">
                    I hereby acknowledge that all activities are stopped in
                    favour of the above alert received.
                  </p>
                  <button
                    type="button"
                    className="btn btn-lg btn-success ack-btn"
                    onClick={this.sendAck}
                  >
                    Acknowledge
                  </button>
                </div>
              )
            ) : (
              <div className="col-md-6 offset-md-3 ack-box">
                <label className="ack-text">Loading ... Please Wait.</label>
              </div>
            )}
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-8 content-box no-warning-box">
              <div className="row">
                <div className="col-md-auto flag-box align-self-center">
                  <img
                    className="img-no-warning"
                    alt="Green Flag"
                    src={NoWarning}
                  />
                </div>
                <div className="col align-self-center">
                  <p className="no-warning-description">
                    No warnings. Activities can be carried out as normal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/*  */}

        <div className="license-box">
          <label>
            Icons made by Smashicons, mynamepong and Freepik from
            www.flaticon.com is licensed by CC 3.0 BY
          </label>
        </div>

        <div
          className="modal fade"
          id="changePlotNo"
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
export default Home;
