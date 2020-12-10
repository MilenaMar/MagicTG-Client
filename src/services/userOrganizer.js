import axios from "axios";

const playerService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user`,
});

//export function getAllEvents() {
//    return eventService.get("/").then((res) => res.data);
//  }

export function getOrganizerProfile(username) {
  return playerService.get(`/organizer/${username}`).then((res) => {
    return res.data;
  });
}

export function updateOrganizerProfile(username, info) {
  return playerService
    .put(`/organizer/${username}/edit-profile`, info, {
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

export function deleteOrganizer(username) {
  // const accessToken = localStorage.getItem("accessToken")
  return playerService
    .post(`/organizer/${username}/delete-profile`, {
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
