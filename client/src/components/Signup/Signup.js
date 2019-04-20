import React, { Component } from "react";
import { signup } from "../userFunctions";
import { Redirect } from "react-router-dom";
import "./Signup.css";
import Logo from "../../images/dsoa-logo-white.png";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      wardenName: "",
      username: "",
      password: "",
      contact: "",
      contractorName: "",
      contractorEmail: "",
      contractorContact: "",
      consultantName: "",
      plotNo: "",
      errors: {},
      redirectToReferrer: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    if (
      this.state.wardenName &&
      this.state.username &&
      this.state.password &&
      this.state.contact &&
      this.state.contractorName &&
      this.state.contractorEmail &&
      this.state.contractorContact &&
      this.state.consultantName &&
      this.state.plotNo
    ) {
      e.preventDefault();

      const newUser = {
        wardenName: this.state.wardenName,
        username: this.state.username,
        password: this.state.password,
        contact: this.state.contact,
        contractorName: this.state.contractorName,
        contractorEmail: this.state.contractorEmail,
        contractorContact: this.state.contractorContact,
        consultantName: this.state.consultantName,
        plotNo: this.state.plotNo
      };

      signup(newUser).then(res => {
        if (res.error) {
          window.alert("Username already taken");
        } else {
          window.alert("Your account has been created successfully.");
          this.props.history.push(`/login`);
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.redirectToReferrer || localStorage.getItem("usertoken")) {
      return <Redirect to={"/home"} />;
    }

    if (localStorage.getItem("admintoken")) {
      return <Redirect to={"/adminhome"} />;
    }

    return (
      <div className="container-fluid signup-container">
        <div className="hero-brand-div">
          <a className="hero-brand" href="./" title="Home">
            <img className="hero-brand-resize" alt="DSOA Logo" src={Logo} />
          </a>
        </div>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <h1 className="web-name">Weather Warning System</h1>
            <div className="card card-signup my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <p className="text-center text-warning">
                  Note: Please fill the form with the correct details!
                </p>
                <form className="form-signup" onSubmit={this.onSubmit}>
                  <div className="form-label-group">
                    <input
                      name="wardenName"
                      value={this.state.wardenName}
                      onChange={this.onChange}
                      className="form-control"
                      id="inputWardenName"
                      placeholder="Full Name"
                      type="text"
                      pattern="[A-Za-z ]{1,50}"
                      title="Name can only be in letters."
                      required
                      autoFocus
                    />
                    <label htmlFor="inputWardenName">Full Name</label>
                    <span className="note">
                      Note: It will be sufficient if only the first 2 names are
                      provided.
                    </span>
                  </div>
                  <div className="form-label-group">
                    <input
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                      type="text"
                      id="inputUsername"
                      className="form-control"
                      placeholder="Username"
                      pattern="[A-Za-z0-9]{1,20}"
                      title="Username must only consist of letters and numbers"
                      required
                    />
                    <label htmlFor="inputUsername">Username</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      required
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      name="contact"
                      value={this.state.contact}
                      onChange={this.onChange}
                      type="tel"
                      id="inputContact"
                      className="form-control"
                      placeholder="Mobile Number"
                      pattern="[0]{1}[5]{1}[0,5,6,8,4,2]{1}[0-9]{7}"
                      title="Enter valid mobile number in this format: 05XXXXXXXX"
                      required
                    />
                    <label htmlFor="inputContact">Mobile Number</label>
                    <span className="note">Format: 0501234567</span>
                  </div>
                  <div className="form-label-group">
                    <input
                      name="contractorName"
                      value={this.state.contractorName}
                      onChange={this.onChange}
                      className="form-control"
                      id="inputContractorName"
                      placeholder="Contractor"
                      type="text"
                      pattern="[A-Za-z0-9 ]{1,60}"
                      title="Contractor name can only be a combination of letters and/or numbers."
                      required
                    />
                    <label htmlFor="inputContractorName">Contractor</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      name="contractorEmail"
                      value={this.state.contractorEmail}
                      onChange={this.onChange}
                      className="form-control"
                      id="inputContractorEmail"
                      placeholder="Contractor Email"
                      type="email"
                      title="Please type in the email address of the contractor"
                      required
                    />
                    <label htmlFor="inputContractorEmail">
                      Contractor Email
                    </label>
                  </div>

                  <div className="form-label-group">
                    <input
                      name="contractorContact"
                      value={this.state.contractorContact}
                      onChange={this.onChange}
                      type="tel"
                      id="inputContractorContact"
                      className="form-control"
                      placeholder="Contractor Contact"
                      pattern="[0]{1}[5,4]{1}[0,5,6,8,4,2]{0,1}[0-9]{7}"
                      title="Enter valid mobile number in this format: 05XXXXXXXX or landline in this format: 04XXXXXXX"
                      required
                    />
                    <label htmlFor="inputContractorContact">
                      Contractor Contact
                    </label>
                    <span className="note">
                      Format: 0501234567 or 041234567
                    </span>
                  </div>

                  <div className="form-label-group">
                    <input
                      name="consultantName"
                      value={this.state.consultantName}
                      onChange={this.onChange}
                      className="form-control"
                      id="inputConsultantName"
                      placeholder="Consultant"
                      type="text"
                      pattern="[A-Za-z0-9 ]{1,60}"
                      title="Consultant name can only be a combination of letters and/or numbers."
                      required
                    />
                    <label htmlFor="inputConsultantName">Consultant</label>
                  </div>

                  <div className="form-group option-box">
                    <label htmlFor="plot">
                      Plot no. you are currently assigned in:
                    </label>
                    <select
                      className="form-control"
                      id="plot"
                      name="plotNo"
                      value={this.state.plotNo}
                      onChange={this.onChange}
                      required
                    >
                      <option />
                      <option>04-003</option>
                      <option>06-020</option>
                      <option>10-001</option>
                      <option>10-003</option>
                      <option>10-006</option>
                      <option>10-015</option>
                      <option>11-013</option>
                      <option>11-043</option>
                      <option>12-002</option>
                      <option>12-007</option>
                      <option>12-013</option>
                      <option>12-016</option>
                      <option>13-014</option>
                      <option>13-015</option>
                      <option>15-006</option>
                      <option>21-011</option>
                      <option>21-012</option>
                      <option>21-016</option>
                      <option>21-017</option>
                      <option>21-020</option>
                      <option>22-002</option>
                      <option>22-003</option>
                      <option>22-018</option>
                      <option>22-024</option>
                      <option>22-026</option>
                      <option>23-007</option>
                      <option>24-001</option>
                      <option>25-055</option>
                      <option>25-079</option>
                      <option>26-030</option>
                      <option>26-057</option>
                      <option>26-059</option>
                      <option>26-065</option>
                      <option>27-019</option>
                      <option>27-035</option>
                      <option>28-016</option>
                    </select>
                  </div>

                  <input
                    type="submit"
                    value="Sign Up"
                    className="btn btn-lg btn-danger btn-block text-uppercase"
                  />
                  <p className="text-center login-label">
                    Already registered? <a href="/login">Log In</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <p>&#xA9; 2019 Weather Warning System, DSOA.</p>
        </footer>
      </div>
    );
  }
}

export default Signup;
