import axios from "axios";

const AuthService = {
  authenticate: UserKey => {
    return axios.get("https://api2-dev.ploomes.com/Contacts", {
      headers: {
        "User-Key": UserKey
      }
    });
  },
  login: (email, pw) => {
    return axios.post("https://api2-dev.ploomes.com/Self/Login", {
      Email: email,
      Password: pw
    });
  }
};

export default AuthService;
