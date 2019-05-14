import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../images/dsoa-logo-white.png";
import { plot } from "../userFunctions";
import { submitplot } from "../userFunctions";
import { removeplot } from "../userFunctions";
import jwt_decode from "jwt-decode";
import $ from "jquery";
import "./UpdatePlotNo.css";

class UpdatePlotNo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminName: "",
      username: "",
      errors: {},
      plotData: [],
      deletePlot: "",
      newPlot: "",
      redirectToReferrer: false
    };
    this.logout = this.logout.bind(this);
    this.getPlot = this.getPlot.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
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

      this.getPlot();
    }
  }

  getPlot = () => {
    plot()
      .then(res => {
        this.setState({ plotData: res });
      })
      .catch(err => {
        console.log("Error loading data");
      });
  };

  onRemove(item) {
    var plotData = {
      plot: item.plot_no
    };

    removeplot(plotData)
      .then(res => {
        if (res.success) {
          window.alert("The plot has been removed");
          this.getPlot();
        } else {
          if (res.error) {
            window.alert("Error: Cannot remove");
          } else {
            if (res.failure) {
              window.alert("Fail: Cannot remove");
            }
          }
        }
      })
      .catch(err => {
        console.log("Could not cancel due to an unexpected error.");
      });
  }

  onSubmitForm(e) {
    if (this.state.newPlot) {
      e.preventDefault();

      const newPlot = {
        newPlot: this.state.newPlot
      };

      submitplot(newPlot).then(res => {
        
        if (res.error) {
          window.alert("Saving failed, try again");
        } else {
          if (res.exist) {
            window.alert("Plot no. already exists.");
            this.setState({ newPlot: "" });
          } else {
            if (res.success) {
              window.alert("Plot has been saved.");
              this.setState({ newPlot: "" });
              this.getPlot();
            }
          }
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
              <a
                href="/updatechecklist"
                className="list-group-item list-group-item-action bg-light"
              >
                Update Checklist
              </a>
              <a
                href="/updateplotno"
                className="list-group-item list-group-item-action bg-light"
              >
                Update Plot No.
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
                <h1 className="admin-log-title">Update Plot No.</h1>
              </div>
              <div className="scroll-label">
                <label>&larr; &uarr; Scroll, if required &darr; &rarr;</label>
              </div>
              <div className="table-div-plot">
                <table className="table table-striped" id="log-table">
                  <thead className="thead-light plot-table-head">
                    <tr>
                      <th>Plot No.</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody className="plot-table-body">
                    {this.state.plotData === undefined ? (
                      <tr>
                        <td />
                        <td>
                          Reloading...
                          {window.location.reload()}
                        </td>
                      </tr>
                    ) : (
                      this.state.plotData.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>{item.plot_no}</td>
                            <td>
                              <button
                                type="submit"
                                onClick={() => this.onRemove(item)}
                                className="btn btn-danger"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="row justify-content-center form-container">
                <div className="col-sm-6 form-box">
                  <h6>Add a new plot:</h6>
                  <form id="plotForm" onSubmit={this.onSubmitForm}>
                    <div className="form-label-group">
                      <input
                        name="newPlot"
                        value={this.state.newPlot}
                        onChange={this.onChange}
                        className="form-control"
                        id="inputNewPlot"
                        pattern="[A-Za-z0-9-]{1,8}"
                        placeholder="Plot No."
                        type="text"
                        title="Enter a new plot number here."
                        required
                      />
                      <label htmlFor="inputNewPlot">Plot No.</label>
                    </div>

                    <input
                      type="submit"
                      value="Add"
                      className="btn btn-sm btn-primary btn-block text-uppercase"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* /#page-content-wrapper */}
        </div>
      </div>
    );
  }
}

export default UpdatePlotNo;
