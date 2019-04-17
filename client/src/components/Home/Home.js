import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { senddata } from "../userFunctions";
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
// import Wind from "../../images/wind.png";
// import Rain from "../../images/rain.png";
// import Visibility from "../../images/fog.png";
import Temperature from "../../images/temperature.png";
import Alert from "../../images/flagRed.png";
import NoWarning from "../../images/flagGreen.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      acknowledgeData: [],
      acknowledgeFlag: false,
      redirectToReferrer: false
    };
    this.logout = this.logout.bind(this);
    this.getWarning = this.getWarning.bind(this);
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
        wardenName: decoded.warden_name,
        username: decoded.username,
        contact: decoded.contact,
        contractorName: decoded.contractorName,
        contractorEmail: decoded.contractorEmail,
        contractorContact: decoded.contractorContact,
        consultantName: decoded.contractorName,
        plotNo: decoded.plotNo
      });

      this.getWarning();
      this.update = setInterval(() => {
        this.getWarning();
      }, 6000);

      // this.getWarning = setInterval(() => {
      //   var receiveWarning = function(msg, data) {
      //     console.log("This is the data received: ", msg, data);
      //     return data;
      //   };

      //   PubSub.subscribe("Warning", receiveWarning);
      //   console.log("Reloaded");
      //   console.log(receiveWarning);
      // }, 5000);
    }
  }

  getWarning = () => {
    senddata()
      .then(res => {
        if (Object.keys(res).length === 0) {
          this.setState({ warningFlag: false });
          this.setState({ alertFlag: false });
        } else {
          if (res[0].warning_type === "warning") {
            let dataArr = res[0].checklist_item;
            dataArr = dataArr.split(",");

            this.setState({ warningData: dataArr });
            this.setState({ warningFlag: true });
          } else {
            if (res[0].warning_type === "alert") {
              this.setState({ warningData: [res[0].checklist_item] });
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
            <h1 className="home-title">Weather Warning System - Home </h1>
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
                      <div className="col flag-box align-self-center">
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
                              : "reached here"
                          }
                        />
                      </div>
                      <div className="col align-self-center">
                        <img
                          className="weather-type"
                          alt="Type of weather condition"
                          src={Temperature}
                        />
                      </div>
                      <div className="col align-self-center">
                        <p className="warning-description">{item}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="col-md-6 offset-md-3 ack-box">
              <p className="text-danger ack-text">
                I hereby acknowledge that appropriate actions were taken
                infavour of the above warnings received.
              </p>
              <button type="button" className="btn btn-lg btn-success ack-btn">
                Acknowledge
              </button>
            </div>
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
            <div className="col-md-6 offset-md-3 ack-box">
              <p className="text-danger ack-text">
                I hereby acknowledge that all activities are stopped in favour
                of the above alert received.
              </p>
              <button type="button" className="btn btn-lg btn-success ack-btn">
                Acknowledge
              </button>
            </div>
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
