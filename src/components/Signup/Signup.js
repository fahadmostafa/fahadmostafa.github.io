import React, { Component } from "react";
//import {PostData} from '../../services/PostData';
//import {Redirect} from 'react-router-dom';
import "./Signup.css";
import Logo from "../../images/dsoa-logo-white.png";
import Background from "../../images/login-bg.jpg";

class Signup extends Component {
  /*
  constructor(props){
    super(props);
   
    this.state = {
     username: '',
     password: '',
     email: '',
     name: '',
     redirectToReferrer: false
    };

    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);

  }
 

  signup() {
    if(this.state.username && this.state.password && this.state.email && this.state.name){
    PostData('signup',this.state).then((result) => {
      let responseJson = result;
      if(responseJson.userData){         
        sessionStorage.setItem('userData',JSON.stringify(responseJson));
        this.setState({redirectToReferrer: true});
      }
      
     });
    }
  } */

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    /*
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'}/>)
    }
   */

    return (
      <div
        className="container-fluid signup-container"
        style={{ backgroundImage: `url(${Background})` }}
      >
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
                <form className="form-signup">
                  <div className="form-label-group">
                    <input
                      name="wardenName"
                      className="form-control"
                      id="inputWardenName"
                      placeHolder="Full Name"
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
                      type="text"
                      id="inputUsername"
                      className="form-control"
                      placeHolder="Username"
                      pattern="[A-Za-z0-9]{1,20}"
                      title="Username must only consist of letters and numbers"
                      required
                    />
                    <label htmlFor="inputUsername">Username</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      name="password"
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeHolder="Password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      required
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      name="contact"
                      type="tel"
                      id="inputContact"
                      className="form-control"
                      placeHolder="Mobile Number"
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
                      className="form-control"
                      id="inputContractorName"
                      placeHolder="Contractor"
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
                      className="form-control"
                      id="inputContractorEmail"
                      placeHolder="Contractor Email"
                      type="email"
                      title="Please type in the email address of the contractor"
                      required
                    />
                    <label htmlFor="inputContractorEmail">Contractor Email</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      name="contractorContact"
                      type="tel"
                      id="inputContractorContact"
                      className="form-control"
                      placeHolder="Contractor Contact"
                      pattern="[0]{1}[0,5,6,8,4,2]{1,2}[0-9]{7}"
                      title="Enter valid mobile number in this format: 05XXXXXXXX or landline in this format: 0XXXXXXXX"
                      required
                    />
                    <label htmlFor="inputContractorContact">Contractor Contact</label>
                    <span className="note">Format: 0501234567 or 041234567</span>
                  </div>

                  <div className="form-label-group">
                    <input
                      name="consultantName"
                      className="form-control"
                      id="inputConsultantName"
                      placeHolder="Consultant"
                      type="text"
                      pattern="[A-Za-z0-9 ]{1,60}"
                      title="Consultant name can only be a combination of letters and/or numbers."
                      required
                    />
                    <label htmlFor="inputConsultantName">Consultant</label>
                  </div>

                  <div className="form-label-group">
                    <div className="form-group">
                      <label htmlFor="plot">
                        Plot no you are currently assigned in:
                      </label>
                      <select className="form-control" id="plot">
                        <option>04-003</option>
                        <option>06-020</option>
                        <option>10-001</option>
                        <option>10-003</option>
                      </select>
                    </div>
                  </div>
                  <button
                    className="btn btn-lg btn-danger btn-block text-uppercase"
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <p className="text-center login-label">
                    Already registered?{" "}
                    <a href="/login">
                      Log In
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
