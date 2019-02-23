import React, {Component} from 'react';
import Background from '../../images/login-bg.jpg';
//import {Redirect} from 'react-router-dom';
//import {PostData} from '../../services/PostData';
import './Login.css';
import Logo from '../../images/dsoa-logo-white.png';

class Login extends Component {
/*
  constructor(){
    super();
   
    this.state = {
     username: '',
     password: '',
     redirectToReferrer: false
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  

  login() {
    if(this.state.username && this.state.password){
      PostData('login',this.state).then((result) => {
       let responseJson = result;
       if(responseJson.userData){         
         sessionStorage.setItem('userData',JSON.stringify(responseJson));
         this.setState({redirectToReferrer: true});
       }
       
      });
    }
    
  } */

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

  
  

  render() {
/*
     if (this.state.redirectToReferrer) {
      return (<Redirect to={'/home'}/>)
    }
   
    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'}/>)
    }
*/
     return (
       <div className="container-fluid login-container" style={{backgroundImage: `url(${Background})`}}>
       <div className="hero-brand-div"><a className="hero-brand" href="./" title="Home"><img className="hero-brand-resize" alt="DSOA Logo" src={Logo}/></a></div>
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <h1 className="web-name">
            Weather Warning System
          </h1>
      <div className="card card-login my-5">
      <div className="card-body">
            <h5 className="card-title text-center">Log In</h5>
            <form className="form-login">
            <div className="form-label-group">
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
                <label for="inputEmail">Email address</label>
            </div>
            <div className="form-label-group">
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <label for="inputPassword">Password</label>
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit">Log in</button>
            </form>
          </div>
        </div>
      </div>
  </div>
  </div>
    );
  }
}

export default Login;