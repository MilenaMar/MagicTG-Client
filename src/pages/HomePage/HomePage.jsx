import React, {Component} from 'react';
import "./HomePage.css";
import "../../App.css"
import ListComments from '../../components/ListComments/ListComments';

export default class HomePage extends Component {
  render (){
  return (
    <div>
    <div className="Home">
    <h1>Here We can Add buttons and events Cards</h1>
    </div>
    <div className="body-home">
     <h1>We Can have filters for events here </h1> 
    </div>
    </div>
  );
}
}

