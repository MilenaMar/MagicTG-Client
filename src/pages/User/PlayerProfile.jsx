import React, { Component } from "react";
//import { getUserProfile } from "../../services/userPlayer"

export default class PlayerProfile extends Component {
    state = {
        user: this.props.user,
      };
    
  //  componentDidMount = () => {
  //    getUserProfile().then((responseBack) => {
  //       console.log("responseBack:", responseBack);
  //      this.setState({ user: responseBack });
  //    });
  //  };
  //

  render() {
      console.log(this.props)
return (
    <div>Im a player {this.props.user.username}</div>
)

  }
}