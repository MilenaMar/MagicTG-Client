import React from "react";
import "./OrganizerProfile.css";
import { Link } from "react-router-dom";
import {
  getOrganizerProfile,
  getAllOrganizerEvents,
} from "../../services/userOrganizer";

import { Redirect } from "react-router-dom";

class OrganizerProfile extends React.Component {
  state = {
    profile: {},
    events: [1, 2, 3],
  };

  componentDidMount = () => {
    console.log(this.props);
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
    console.log(this.props.match.params.username, this.props.user.username);
    return (
      <div>
        <div className="orgProfile">
          <div>{this.state.profile.username}</div>
          {this.props.match.params.username === this.props.user.username ? (
            <Link
              to={`/user/organizer/${this.props.user.username}/edit-profile`}
            >
              <button>Edit profile</button>
            </Link>
          ) : (
            <div></div>
          )}

          <div className="eventsTable">
            <div className="tableHeader">
              <h2>My Events</h2>
              {this.props.match.params.username === this.props.user.username ? (
                <Link to={`/event/new`}>
                  <button>New Event</button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
            {this.state.events.map((event, i) => (
              <div key={i} className="eventRow">
                {event.name}
                {event.location}
                {event.date}
                {this.props.match.params.username ===
                this.props.user.username ? (
                  <Link to={`/event/edit/${event._id}`}>
                    <button>Edit Event</button>
                  </Link>
                ) : (
                  <div></div>
                )}
                <Link to="/event/_id">
                  <button>See Event</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default OrganizerProfile;
