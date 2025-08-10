import axios from "axios";
const connection = axios.create({
  baseURL: "https://blogging-backend-zv4s.onrender.com",

  withCredentials: true,
});
export default connection;
