import React, { Component } from "react";
import Event from "../../components/Event/EventR";
import { Link } from "react-router-dom";
import "./PlayerProfile.css";
import { getUserProfile } from "../../services/userPlayer";
import { getAllEvents } from "../../services/events";

export default class PlayerProfile extends Component {
  state = {
    user: this.props.user,
    events: [],
  };

  componentDidMount = () => {
    getUserProfile(this.props.match.params.username).then((responseBack) => {
      if (responseBack.user === null) {
        return this.props.history.push("/page-no-found");
      }
      this.setState({ user: responseBack });
    });

    getAllEvents().then((responseBack) => {
      console.log("responseBack:", responseBack);
      const mygames = responseBack.filter(
        (e) => e.players._id === this.state.user._id
      );
      this.setState({ events: mygames });
    });
  };

  render() {
    return (
      <div className="PlayerProfile">
        <div>Im a player {this.props.user.username}</div>
        <img src={this.props.user.avatar} alt="avatar"></img>
        {this.props.user.username === this.props.match.params.username && (
          <Link to={`/user/player/${this.props.user.username}/edit`}>
            Edit My Profile
          </Link>
        )}
      </div>
    );
  }
}
