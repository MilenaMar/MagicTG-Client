import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../services/userPlayer";

export default class PlayerProfile extends Component {
  state = {
    user: this.props.user,
  };

  componentDidMount = () => {
    getUserProfile(this.props.computedMatch.params.username).then((responseBack) => {
      console.log("responseBack:", responseBack);
      this.setState({ user: responseBack });
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div>Im a player {this.props.user.username}</div>
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
