import React from "react";
import "./OrganizerProfile.css";
import { Link } from "react-router-dom";
import {FaUserEdit} from 'react-icons/fa'
import {BiNews} from 'react-icons/bi'
import {
  getOrganizerProfile,
  getAllOrganizerEvents,
} from "../../services/userOrganizer";


class OrganizerProfile extends React.Component {
  state = {
    profile: {},
    events: [],
  };

  componentDidMount = () => {
    getOrganizerProfile(this.props.match.params.username).then((resp) => {
      !resp.user
        ? this.props.history.push(`/page-no-found`)
        : this.setState({ profile: resp.user });
    });
    getAllOrganizerEvents(this.props.user.username).then((events) => {
      this.setState({ events: events });
    });
  };

  render() {
    return (
      <div className = "OrganizerProfile">
      <div className="buttons-org">
      {this.props.match.params.username === this.props.user.username ? (
            <Link
              to={`/user/organizer/${this.props.user.username}/edit-profile`}
            >
              <button> <FaUserEdit size={30} /> Edit profile </button>
            </Link>
          ) : (
            <div></div>
          )}
      </div>
<div className="OrgCard">
<div className="organizer-information"> 
<img src={this.state.profile.avatar}/>
<div><h1>{this.state.profile.username}</h1>
<p>{this.state.profile.userType}</p>
</div>
</div>
<div className="events">
<h2>My Events</h2>
              {this.props.match.params.username === this.props.user.username ? (
                <Link to={`/event/new`}>
                  <button> <BiNews size={30} />New Event </button>
                </Link>
              ) : (
                <div></div>
              )}
</div>
            {this.state.events.map((event, i) => (
              <div key={i} className="eventRow">
              <div>
                <p>{event.name}</p>
                <p>{event.location}</p>
                <p>{event.date}</p>
                </div>
                <div className="edit-event">
                {this.props.match.params.username ===
                this.props.user.username ? (
                  <Link to={`/event/edit/${event._id}`}>
                    <button>Edit Event</button>
                  </Link>
                ) : (
                  <div></div>
                )}
                <Link to={`/event/${event._id}`}>
                  <button>See Event</button>
                </Link>
              </div>
              </div>
            ))} 
          </div>
          </div>
    );
  }
}

export default OrganizerProfile;
