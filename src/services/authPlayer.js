import axios from "axios";

// here we are just maing our code look more DRY. With every backend call we must deal with errors and success states. The idea of creating these kinds of services is to make our lives easier in the components
function internalServerError(err) {
  console.log("err:", err.response.data);
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: false,
    errorMessage: "Internal server error. Please check your server",
  };
}

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

// creates a basic url for every request in this file
const authPlayerService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
});

export function login(credentials) {
  return authPlayerService
    .post("/login/player", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function getLoggedIn(userType) {
  return authPlayerService
    .get(`session`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        userType: userType,
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}

export function signup(credentials) {
  return authPlayerService
    .post("/signup/player", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function logout() {
  return authPlayerService
    .delete("/logout", {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}