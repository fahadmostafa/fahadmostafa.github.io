import React, { Component } from "react";
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
import Wind from "../../images/wind.png";
import Rain from "../../images/rain.png";
import Visibility from "../../images/fog.png";
import Temperature from "../../images/temperature.png";
import Alert from "../../images/flagRed.png";
import NoWarning from "../../images/flagGreen.png";

class Home extends Component {
  render() {
    return (
      <div className="container-fluid back">
        <div className="row">
          <div className="col-sm home-brand-div">
            <img className="home-brand-resize" alt="DSOA Logo" src={Logo} />
          </div>
          <div className="col-sm home-title-div">
            <h1 className="home-title">Weather Warning System - Home</h1>
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
            <button className="btn btn-sm btn-dark log-out-btn">Log out</button>
          </div>
        </div>
        <div className="warnings-label-box">
          <label className="warnings-label">3 warnings received</label>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 content-box warning-box">
            <div className="row">
              <div className="col align-self-center">
                <img
                  className="img-warning"
                  alt="Yellow Flag"
                  src={WarningSummer}
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
                <p className="warning-description">
                  Suspend all work activities from 15th Jun 2019 to 15th Sept
                  2019 (12:30 PM - 3:00 PM)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 content-box warning-box">
            <div className="row">
              <div className="col align-self-center">
                <img
                  className="img-warning"
                  alt="Yellow Flag"
                  src={WarningLift}
                />
              </div>
              <div className="col align-self-center">
                <img
                  className="weather-type"
                  alt="Type of weather condition"
                  src={Wind}
                />
              </div>
              <div className="col align-self-center">
                <p className="warning-description">
                Stop all the lifting operation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 content-box warning-box">
            <div className="row">
              <div className="col align-self-center">
                <img
                  className="img-warning"
                  alt="Yellow Flag"
                  src={WarningPuddle}
                />
              </div>
              <div className="col align-self-center">
                <img
                  className="weather-type"
                  alt="Type of weather condition"
                  src={Rain}
                />
              </div>
              <div className="col align-self-center">
                <p className="warning-description">
                Remove stagnant water.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 content-box alert-box">
            <img className="img-alert" alt="Red Flag" src={Alert} />
            <p className="alert-description">
              All activities must be stopped immediately.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 content-box no-warning-box">
            <img className="img-no-warning" alt="Green Flag" src={NoWarning} />
            <p className="no-warning-description">
              No warnings. Activities can be carried out as normal.
            </p>
          </div>
          
        </div>
        <div className="col-md-6 offset-md-3 ack-box">
            <p className="text-danger ack-text">
              I hereby acknowledge that appropriate actions were taken infavour
              of the warnings received.
            </p>
            <button type="button" className="btn btn-lg btn-success ack-btn">
              Acknowledge Warnings
            </button>
          </div>
        <label>
          Icons made by Smashicons, mynamepong and Freepik from www.flaticon.com
          is licensed by CC 3.0 BY
        </label>

        <div
          className="modal fade"
          id="changePlotNo"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ChangePlotNo=umberModal"
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
