import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import $ from 'jquery';
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
    //   <div>
    //     <p>This is admin home and you are logged in as {this.state.adminName}</p>
    //     <button
    //       className="btn btn-sm btn-dark log-out-btn"
    //       type="submit"
    //       onClick={this.logout}
    //     >
    //       Log out
    //     </button>
    //   </div>
    <div className="container-fluid back">
    <div className="d-flex" id="wrapper">

    {/* Sidebar */}
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading"></div>
      <div className="list-group list-group-flush">
        <a href="." className="list-group-item list-group-item-action bg-light">Dashboard</a>
        <a href="." className="list-group-item list-group-item-action bg-light">Shortcuts</a>
        <a href="." className="list-group-item list-group-item-action bg-light">Overview</a>
        <a href="." className="list-group-item list-group-item-action bg-light">Events</a>
        <a href="." className="list-group-item list-group-item-action bg-light">Profile</a>
        <a href="." className="list-group-item list-group-item-action bg-light">Status</a>
      </div>
    </div>
    {/* /#sidebar-wrapper */}

    {/* Page Content */}
    <div id="page-content-wrapper">

      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href=".">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href=".">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="." id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href=".">Action</a>
                <a className="dropdown-item" href=".">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href=".">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid">
        <h1 className="mt-4">Simple Sidebar</h1>
        <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
      </div>
    </div>
    {/* /#page-content-wrapper */}

  </div>
  </div>
    );
  }
}

export default AdminHome;
