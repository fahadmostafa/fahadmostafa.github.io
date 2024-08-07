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
    .catch(err => {
      console.log("Something went wrong, try again");
    });
};

export const adminsignup = newAdmin => {
  return axios
    .post("users/adminsignup", {
      adminName: newAdmin.adminName,
      username: newAdmin.username,
      password: newAdmin.password
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Something went wrong, try again");
    });
};

export const submititem = newItem => {
  return axios
    .post("users/submititem", {
      newItem: newItem.newItem,
      newItemWeatherCond: newItem.newItemWeatherCond
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Error: Item could not be sent");
    });
};

export const submitplot = newPlot => {
  return axios
    .post("users/submitplot", {
      newPlot: newPlot.newPlot
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Error: Plot could not be sent");
    });
};

export const changeplot = newPlot => {
  return axios
    .post("users/changeplot", {
      userid: newPlot.userid,
      newPlotNo: newPlot.newPlotNo
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("failed to update plot no.");
    });
};

export const getdata = dataArr => {
  return axios
    .post("users/getdata", {
      selectedChecklistData: dataArr.selectedChecklistData,
      warning: dataArr.warning,
      warningDate: dataArr.warningDate
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Failure");
    });
};

export const senddata = () => {
  return axios
    .get("users/senddata")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Failed to retrieve warning/alert data");
    });
};

export const deletedata = () => {
  return axios
    .delete("users/deletedata")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Failed to initiate delete");
    });
};

export const removeitem = itemData => {
  return axios
    .post(
      "users/removeitem",
      {
        item: itemData.item
      },
    )
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Item removing could not be initiated");
    });
};

export const removeplot = plotData => {
  return axios
    .post(
      "users/removeplot",
      {
        plot: plotData.plot
      },
    )
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Plot removing could not be initiated");
    });
};

export const acksend = ackArr => {
  return axios
    .post("users/acksend", {
      userid: ackArr.userid,
      userPlotNo: ackArr.userPlotNo,
      acknowledgeDate: ackArr.acknowledgeDate,
      warningRecDate: ackArr.warningRecDate
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Failed to log acknowledgement.");
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
  return axios
    .get("users/log")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("No log data found");
    });
};

export const condition = () => {
  return axios
    .get("users/condition")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("No weather condition data found");
    });
};

export const checklist = () => {
  return axios
    .get("users/checklist")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("No checklist data found");
    });
};

export const plot = () => {
  return axios
    .get("users/plot")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("No plot data found");
    });
};
