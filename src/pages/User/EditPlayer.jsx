import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../services/userPlayer"

export default class EditProfile extends Component {
    state = {
        user: this.props.user,
      };
    
    componentDidMount = () => {
      getUserProfile(this.props.user._id).then((responseBack) => {
         console.log("responseBack:", responseBack);
        this.setState({ user: responseBack });
      });
    };
  

  render() {
      console.log(this.props)
return (
  <div>
    <div>Im a edit page {this.props.user.username}</div>
     {<Link to={`/user/player/${this.props.user.username}`}>
        GO BACK
      </Link>}
  </div>
)

  }
}