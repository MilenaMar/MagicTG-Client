import React, { Component } from "react";
import { getUserProfile } from "../../services/userPlayer"

export default class PlayerProfile extends Component {
    state = {
        user: null,
      };
    
      componentDidMount = () => {
        getUserProfile().then((responseBack) => {
           console.log("responseBack:", responseBack);
          this.setState({ user: responseBack });
        });
      };
    

  render() {
      console.log(this.props)
return (
    <div>Im a player</div>
)

  }
}