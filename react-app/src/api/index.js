import axios from "axios";

export const api = axios.create({
  baseURL: "https://salty-sands-74195.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: "https://salty-sands-74195.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
