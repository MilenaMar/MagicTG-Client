import React, {Component} from 'react';
import "./Attend.css"

export default class Attend extends Component {
  render(){
    let name;
    if(this.props.event ==="Attending Event"){
     name = "attending"
    } else {
      name ="attend"
    }
    return(
      <button onClick={this.props.handler} className={name}>{this.props.event}</button>
    );
  }
}

