import axios from "axios";

const API = axios.create({
  baseURL: "https://education-blog-mnil.onrender.com/api",
});

export default API;