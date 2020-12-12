import React, { Component } from "react";
import Event from "../../components/Event/EventR";
import { Link } from "react-router-dom";
import "./PlayerProfile.css";
import { getUserProfile } from "../../services/userPlayer";
import { getAllPlayerEvents } from "../../services/events";
import LoadingComponent from "../../components/Loading";

export default class PlayerProfile extends Component {
  state = {
    user: this.props.user,
    events: [],
    loading:true
  };

  componentDidMount = () => {
    getUserProfile(this.props.match.params.username).then((responseBack) => {
      if (responseBack.user === null) {
        return this.props.history.push("/page-no-found");
      }
      this.setState({ user: responseBack,loading:false });
    });
      
    getAllPlayerEvents(this.props.user.username).then((events) => {
      this.setState({ events: events });
    });
  };

  render() {
    if (this.state.loading) {
      return <LoadingComponent/>;
    }
    return (
      <div className="PlayerProfile">
        <div>Im a player {this.props.user.username}</div>
        <img src={this.props.user.avatar} alt="avatar"></img>
        <h1>This is a list of events I am attending</h1>
        {this.state.events.map((e)=> <Event event={e} key={e._id}/>)}
        {this.props.user.username === this.props.match.params.username && (
          <Link to={`/user/player/${this.props.user.username}/edit`}>
            Edit My Profile
          </Link>
        )}
      </div>
    );
  }
}
