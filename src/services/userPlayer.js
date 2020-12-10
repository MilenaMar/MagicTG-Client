import axios from "axios";

const userService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user`,
});


//export function getAllEvents() {
//    return eventService.get("/").then((res) => res.data);
//  }

export function getUserProfile(username) {
  return userService.get(`/player/${username}`).then((res) => {
    return res.data;
  });
}

export function updateUserProfile(username, info) {
  return userService
    .put(`/player/${username}/edit-profile`, info, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return {
        status: true,
        data: response.data,
      };
    })
    .catch((err) => {
      console.log("INSINDE THE CATCH");
      console.log(err.response);
      return {
        status: false,
        errorMessage: err.response.data.errorMessage,
      };
    });
}

export function deleteUser(username) {
    // const accessToken = localStorage.getItem("accessToken")
    return userService
      .post(`/player/${username}/delete-profile`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        return {
          status: true,
          data: response.data,
        };
      })
      .catch((err) => {
        console.log("INSINDE THE CATCH");
        console.log(err.response);
        return {
          status: false,
          errorMessage: err.response.data.errorMessage,
        };
      });
  }
