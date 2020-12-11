import axios from "axios";

const eventService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/event`,
});

export function getAllEvents() {
  return eventService.get("/").then((res) => res.data);
}

export function addNewEvent(event) {
  // const accessToken = localStorage.getItem("accessToken")
  return eventService
    .post("/new", event, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        userTyper: localStorage.getItem("userType"),
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

export function getSingleEvent(id) {
  return eventService.get(`/${id}`).then((res) => {
    return res.data;
  });
}

export function deleteSingleEvent(id) {
  return eventService
    .delete(`/delete/${id}/`, {
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

export function updateSingleEvent(id, info) {
  return eventService
    .put(`/edit/_${id}/`, info, {
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

export function attendEvent(id, info) {
  return eventService
    .put(`/${id}/attend`, info, {
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
