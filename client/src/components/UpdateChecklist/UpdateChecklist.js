import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../images/dsoa-logo-white.png";
import { checklist } from "../userFunctions";
import { condition } from "../userFunctions";
import { submititem } from "../userFunctions";
import { removeitem } from "../userFunctions";
import jwt_decode from "jwt-decode";
import $ from "jquery";
import "./UpdateChecklist.css";

class UpdateChecklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminName: "",
      username: "",
      errors: {},
      checklistData: [],
      conditionData: [],
      deleteItem: "",
      newItem: "",
      newItemWeatherCond: 0,
      redirectToReferrer: false
    };
    this.logout = this.logout.bind(this);
    this.getChecklist = this.getChecklist.bind(this);
    this.getConditions = this.getConditions.bind(this);
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

      this.getChecklist();
      this.getConditions();
    }
  }

  getChecklist = () => {
    checklist()
      .then(res => {
        this.setState({ checklistData: res });
      })
      .catch(err => {
        console.log("Error loading data");
      });
  };

  getConditions = () => {
    condition()
      .then(res => {
        this.setState({ conditionData: res });
      })
      .catch(err => {
        console.log("Error loading data");
      });
  };

  onRemove(item) {
    var itemData = {
      item: item.checklist_id
    };

    removeitem(itemData)
      .then(res => {
        if (res.success) {
          window.alert("The item has been removed");
          this.getChecklist();
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
    if (this.state.newItem && this.state.newItemWeatherCond) {
      e.preventDefault();

      const newItem = {
        newItem: this.state.newItem,
        newItemWeatherCond: this.state.newItemWeatherCond
      };

      submititem(newItem).then(res => {
        if (res.error) {
          window.alert("Saving failed, try again");
        } else {
          window.alert("Checklist has been saved.");
          this.setState({ newItem: "", newItemWeatherCond: 0 });
          this.getChecklist();
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
                <h1 className="admin-log-title">Update Checklist</h1>
              </div>
              <div className="justify-content-center">
                <label>&larr; &uarr; Scroll, if required &darr; &rarr;</label>
              </div>
              <div className="table-div-checklist">
                <table className="table table-striped" id="log-table">
                  <thead className="thead-light">
                    <tr>
                      <th>Checklist Item</th>
                      <th>Weather Condition</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.checklistData === undefined ? (
                      <tr>
                        <td />
                        <td>
                          Reloading...
                          {window.location.reload()}
                        </td>
                        <td />
                      </tr>
                    ) : (
                      this.state.checklistData.map(item => {
                        return (
                          <tr key={item.checklist_id}>
                            <td>{item.checklist_item}</td>
                            <td>
                              {item.condition_id === 1
                                ? "Rain"
                                : item.condition_id === 2
                                ? "Visibility"
                                : item.condition_id === 3
                                ? "Wind Speed"
                                : item.condition_id === 4
                                ? "High Temp"
                                : "-"}
                            </td>
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
                  <h6>Add new checklist activity:</h6>
                  <form id="checklistForm" onSubmit={this.onSubmitForm}>
                    <div className="form-label-group">
                      <input
                        name="newItem"
                        value={this.state.newItem}
                        onChange={this.onChange}
                        className="form-control"
                        id="inputNewItem"
                        placeholder="Activity"
                        type="text"
                        title="Write the name of the activity to add as a checklist item for warnings."
                        required
                      />
                      <label htmlFor="inputNewItem">
                        Checklist Activity Name
                      </label>
                    </div>
                    <div className="form-group ">
                      <label htmlFor="relatedWeatherCondition">
                        Select related weather condition:
                      </label>
                      <select
                        className="form-control"
                        id="relatedWeatherCondition"
                        name="newItemWeatherCond"
                        value={this.state.newItemWeatherCond}
                        onChange={this.onChange}
                        required
                      >
                        <option />
                        {this.state.conditionData === undefined ? (
                          <option />
                        ) : (
                          this.state.conditionData.map(item => {
                            return (
                              <option key={item.weather_Id}>
                                {item.weather_Id}
                              </option>
                            );
                          })
                        )}
                      </select>
                      <label>
                        Note: 1 is Rain, 2 is Visibility, 3 is Wind Speed and 4
                        is High Temp
                      </label>
                    </div>

                    <input
                      type="submit"
                      value="Save"
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

export default UpdateChecklist;
