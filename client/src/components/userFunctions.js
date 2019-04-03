import axios from "axios";

export const signup = newUser => {
  return axios
    .post("users/signup", {
      wardenName: newUser.wardenName,
      username: newUser.username,
      password: newUser.password,
      contact: newUser.contact,
      contractorName: newUser.contractorName,
      contractorEmail: newUser.contractorEmail,
      contractorContact: newUser.contractorContact,
      consultantName: newUser.consultantName,
      plotNo: newUser.plotNo
    })
    .then(response => {
      return response.data;
    })
};

export const login = user => {
  return axios
    .post("users/login", {
      username: user.username,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log("Wrong username or password");
    });
};

export const adminlogin = user => {
  return axios
    .post("users/adminlogin", {
      username: user.username,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("admintoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log("Wrong username or password");
    });
};
