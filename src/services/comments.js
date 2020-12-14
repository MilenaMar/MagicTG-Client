import axios from "axios";

const commentService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/event`,
});


export function addComment(comment) {
    return commentService
      .post(`/addcomment`,comment)
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
  

export function getComments(id) {
  return commentService.get(`/allcomments/${id}`)
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
