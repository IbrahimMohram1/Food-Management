import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://upskilling-egypt.com:3006/api/v1`,
  withCredentials: false,
});

export default axiosClient;
