import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../images/dsoa-logo-white.png";
import { checklist } from "../userFunctions";
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
      deleteItem: "",
      redirectToReferrer: false
    };
    this.logout = this.logout.bind(this);
    this.getChecklist = this.getChecklist.bind(this);
    this.onRemove = this.onRemove.bind(this);
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

  onRemove(item) {
    var itemData = {
      item: item.checklist_id
    };

    console.log(itemData);

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
            </div>
          </div>
          {/* /#page-content-wrapper */}
        </div>
      </div>
    );
  }
}

export default UpdateChecklist;
