const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const wardens = require("../models/wardens");
const admins = require("../models/admins");
const checklists = require("../models/checklists");
const plots = require("../models/plots");
const warning_logs = require("../models/warning_logs");
const selected_checklists = require("../models/selected_checklists");
const weather_conditions = require("../models/weather_conditions");

users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/signup", (req, res) => {
  const userData = {
    warden_name: req.body.wardenName,
    warden_username: req.body.username,
    password: req.body.password,
    warden_contact: req.body.contact,
    contractor_name: req.body.contractorName,
    contractor_email: req.body.contractorEmail,
    contractor_contact: req.body.contractorContact,
    consultant_name: req.body.consultantName,
    plot_number: req.body.plotNo
  };

  wardens
    .findOne({
      where: {
        warden_username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        var formPass = req.body.password;
        if (formPass.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
          bcrypt.hash(formPass, 10, (err, hash) => {
            userData.password = hash;
            wardens
              .create(userData)
              .then(user => {
                res.json({ status: user.warden_username + " is registered" });
                console.log(user.warden_username + " is registered");
              })
              .catch(err => {
                res.send("error: " + err);
                console.log("error: " + err);
              });
          });
        } else {
          res.send(
            "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
          );
          console.log(
            "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
          );
        }
      } else {
        res.json({ error: " Username is already taken" });
        console.log("Username already exists");
      }
    })
    .catch(err => {
      res.send("error: " + err);
      console.log("error: " + err);
    });
});

users.post("/getdata", (req, res) => {
  const checklistData = {
    checklist_id: 1,
    checklist_item: req.body.selectedChecklistData,
    warning_type: req.body.warning,
    warning_date: req.body.warningDate
  };

  selected_checklists
    .findOne({
      where: {
        checklist_id: 1
      }
    })
    .then(data => {
      if (!data) {
        selected_checklists
          .create(checklistData)
          .then(data => {
            res.send({ status: data.checklist_item + " is stored" });
            console.log(data.checklist_item + " is stored");
          })
          .catch(err => {
            res.send("error storing data: " + err);
            console.log("error storing data");
          });
      } else {
        res.send({ error: "cannot update" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
      console.log("error: " + err);
    });
});

users.post("/acksend", (req, res) => {
  const ackData = {
    warden_identity: req.body.userid,
    plot_no: req.body.userPlotNo,
    feedback_rec_time: req.body.acknowledgeDate,
    warning_date: req.body.warningRecDate
  };

  warning_logs
    .create(ackData)
    .then(status => {
      if (status) {
        res.json({
          success: "Log has been created"
        });
      } else {
        res.json({
          failure: "Failed to log data"
        });
      }
    })
    .catch(err =>
      res.json({
        error: "Could not create a log"
      })
    );
});

users.post("/adminsignup", (req, res) => {
  const adminData = {
    admin_name: req.body.adminName,
    admin_username: req.body.username,
    password: req.body.password
  };

  admins
    .findOne({
      where: {
        admin_username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        var formPass = req.body.password;
        if (formPass.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
          bcrypt.hash(formPass, 10, (err, hash) => {
            adminData.password = hash;
            admins
              .create(adminData)
              .then(user => {
                res.json({ status: user.admin_username + " is registered" });
                console.log(user.admin_username + " is registered");
              })
              .catch(err => {
                res.send("error: " + err);
                console.log("error: " + err);
              });
          });
        } else {
          res.send(
            "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
          );
          console.log(
            "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
          );
        }
      } else {
        res.json({ error: " Username is already taken" });
        console.log("Username already exists");
      }
    })
    .catch(err => {
      res.send("error: " + err);
      console.log("error: " + err);
    });
});

users.post("/login", (req, res) => {
  wardens
    .findOne({
      where: {
        warden_username: req.body.username
      }
    })
    .then(user => {
      if (user) {
        var formPass = req.body.password;
        if (formPass.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
          if (bcrypt.compareSync(formPass, user.password)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {});
            res.send(token);
          } else {
            res.status(404).json({ error: " Wrong username or password" });
            console.log("Wrong username or password");
          }
        } else {
          res.status(404).json({
            error:
              "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
          });
        }
      } else {
        res.status(404).json({ error: " Wrong username or password" });
      }
    })
    .catch(err => {
      res.status(404).json({ error: " User not found" });
    });
});

users.post("/adminlogin", (req, res) => {
  admins
    .findOne({
      where: {
        admin_username: req.body.username
      }
    })
    .then(user => {
      if (user) {
        var formPass = req.body.password;
        if (formPass.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
          if (bcrypt.compareSync(formPass, user.password)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {});
            res.send(token);
          } else {
            res.status(404).json({ error: " Wrong username or password" });
          }
        } else {
          res.status(404).json({
            error:
              "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
          });
        }
      } else {
        res.status(404).json({ error: " Wrong username or password" });
      }
    })
    .catch(err => {
      res.status(404).json({ error: " User not found" });
    });
});

users.post("/changeplot", (req, res) => {
  wardens
    .update(
      {
        plot_number: req.body.newPlotNo
      },
      {
        where: {
          warden_id: req.body.userid
        }
      }
    )
    .then(plotchange => {
      if (plotchange) {
        res.json({ status: req.body.newPlotNo + " has been updated." });
      }
    })
    .catch(err => {
      res.status(404).json({ error: "Could not update plot number" });
    });
});

users.get("/usersinfo", (req, res) => {
  wardens
    .findAll({
      attributes: [
        "warden_id",
        "warden_name",
        "warden_contact",
        "contractor_name",
        "contractor_email",
        "contractor_contact",
        "consultant_name",
        "plot_number"
      ]
    })
    .then(usersinfo => {
      res.end(JSON.stringify(usersinfo));
    })
    .catch(err => {
      res.status(404).json({ err });
    });
});

users.delete("/deletedata", (req, res) => {
  selected_checklists
    .destroy({
      where: {
        checklist_id: 1
      }
    })
    .then(status => {
      if (status) {
        res.json({
          success: "Warning/Alert has been deleted"
        });
      } else {
        res.json({
          failure: "No warning/alert to delete"
        });
      }
    })
    .catch(err =>
      res.json({
        error: "Could not cancel warning/alert."
      })
    );
});

users.post("/removeitem", (req, res) => {
  checklists
    .destroy({
      where: {
        checklist_id: req.body.item
      }
    })
    .then(status => {
      console.log(status);
      if (status) {
        res.json({
          success: "Checklist item has been deleted"
        });
      } else {
        res.json({
          failure: "Failed to delete"
        });
      }
    })
    .catch(err =>
      res.json({
        error: "Could not delete, not found. " + req.body.item
      })
    );
});

users.get("/log", (req, res) => {
  warning_logs
    .findAll({
      order: [["log_id", "DESC"]]
    })
    .then(log => {
      res.end(JSON.stringify(log));
    })
    .catch(err => {
      res.status(404).json({ err });
    });
});

users.get("/checklist", (req, res) => {
  checklists
    .findAll()
    .then(checklist => {
      res.end(JSON.stringify(checklist));
    })
    .catch(err => {
      res.status(404).json({ err });
    });
});

users.get("/plot", (req, res) => {
  plots
    .findAll()
    .then(plot => {
      res.end(JSON.stringify(plot));
    })
    .catch(err => {
      res.status(404).json({ err });
    });
});

users.get("/senddata", (req, res) => {
  selected_checklists
    .findAll()
    .then(selectedChecklist => {
      res.end(JSON.stringify(selectedChecklist));
    })
    .catch(err => {
      res.status(404).json({ err });
    });
});

module.exports = users;
