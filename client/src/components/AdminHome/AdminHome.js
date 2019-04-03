import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./AdminHome.css";
// import Logo from "../../images/dsoa-logo-white.png";

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
        <p>This is admin home and you are logged in as {this.state.adminName}</p>
        <button
          className="btn btn-sm btn-dark log-out-btn"
          type="submit"
          onClick={this.logout}
        >
          Log out
        </button>
      </div>
    );
  }
}

export default AdminHome;
