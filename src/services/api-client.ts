import axios from "axios";

export default axios.create({
  baseURL: "https://server-proxy-9eoa.onrender.com/api",
  params: {
    key: "0d8ffd519baa41a38f43d72057e2b3a4",
  },
});
