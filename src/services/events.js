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
    .put(`/edit/${id}/`, info, {
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

export function attendEvent(id,userid) {
  return eventService
    .post(`/${id}/attend`,userid, {
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

export function unattendEvent(id,userid) {
  return eventService
    .post(`/${id}/unattend`,userid, {
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

export function getAllPlayerEvents(username) {
  return eventService
    .get(`/${username}/events`)
    .then((res) => res.data);
}

