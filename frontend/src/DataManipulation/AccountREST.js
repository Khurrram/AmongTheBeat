import axios from "axios";
// const userModel = require("../../../models/userModel.js");

export const instance = axios.create({ baseURL: "http://localhost:5000" });

export const getToken = async (accountID) => {
  return instance
    .post("/api/getToken", { _id: accountID })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("GetToken Error");
    });
};

export const checkPassword = async (
  accountID,
  currentPassword,
  newPassword
) => {
  return instance
    .post("/api/user/checkpass", {
      id: accountID,
      oldpass: currentPassword,
      newPassword: newPassword,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("checkPassword Error");
    });
};

export const changePassword = async (
  accountID,
  currentPassword,
  newPassword
) => {
  return instance
    .post("/api/user/changepass", {
      id: accountID,
      oldpass: currentPassword,
      newPassword: newPassword,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("changePassword Error");
    });
};

export const getUsername = async (accountID) => {
  return instance
    .post("/api/user/getusername", { id: accountID })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("changePassword Error");
    });
};
