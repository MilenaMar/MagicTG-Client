import axios from "axios";

const userService = axios.create({
  baseURL: "http://localhost:5005/user",
});


//export function getAllEvents() {
//    return eventService.get("/").then((res) => res.data);
//  }

export function getUserProfile(username) {
  return userService.get(`/${username}`).then((res) => {
    return res.data;
  });
}

export function updateUserProfile(id, info) {
  return userService
    .put(`/${username}/edit-profile`, info, {
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

export function deleteUser(event) {
    // const accessToken = localStorage.getItem("accessToken")
    return userService
      .post(`/${username}/delete-profile`, event, {
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
