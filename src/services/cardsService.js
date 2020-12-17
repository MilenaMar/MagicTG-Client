import axios from "axios";
const mtg = require('mtgsdk')


export function getCards() {
return mtg.card.where({ page: 1, pageSize: 4})
.then((response) => {
    return {
      status: true,
      data: response,
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



export function getRandom(){
  return  axios.get('https://api.scryfall.com/cards/random').then((response) => {
    return {
      status: true,
      data: response,
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

