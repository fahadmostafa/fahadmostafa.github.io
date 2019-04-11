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
    });
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

export const usersinfo = () => {
  return axios
    .get("users/usersinfo")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("No user data found");
    });
};

export const log = () => {
  return axios.get("users/log")
  .then(response => {
    return response.data;
  })
  .catch(err => {
    console.log("No log data found");
  })
}

export const checklist = () => {
  return axios.get("users/checklist")
  .then(response => {
    return response.data;
  })
  .catch(err => {
    console.log("No checklist data found");
  })
}
