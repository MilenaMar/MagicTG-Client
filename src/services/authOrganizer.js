import axios from "axios";

// creates a basic url for every request in this file
const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
});

export function loginOrg(credentials) {
  return authService
    .post("/login/organizer", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function signupOrg(credentials) {
  return authService
    .post("/signup/organizer", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function logoutOrg() {
  return authService
    .delete("/logout/organizer", {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}
