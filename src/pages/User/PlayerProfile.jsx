import React, { Component } from "react";
import { Link } from "react-router-dom";
import './PlayerProfile.css'
import { getUserProfile } from "../../services/userPlayer";

export default class PlayerProfile extends Component {
  state = {
    user: this.props.user,
  };

  componentDidMount = () => {
    getUserProfile(this.props.computedMatch.params.username).then((responseBack) => {
     if (responseBack.user === null){
       return  this.props.history.push('/page-no-found')
    }
      console.log("responseBack:", responseBack);
      this.setState({ user: responseBack });
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="PlayerProfile">
        <div>Im a player {this.props.user.username}</div>
        <img src={this.props.user.avatar} alt="avatar"></img>
        {this.props.user.username ===
          this.props.computedMatch.params.username && (
          <Link to={`/user/player/${this.props.user.username}/edit`}>
            Edit My Profile
          </Link>
        )}
      </div>
    );
  }
}
