import React from "react";
import "./OrganizerPlayer.css";

class OrganizerProfile extends React.Component {
  state = {
    user: this.props.user,
    events: [1, 2, 3],
  };

  render() {
    return (
      <div className="orgProfile">
        <div>{this.state.user.username}</div>
        <div className="eventsTable">
          <div className="tableHeader"></div>
          {this.state.events.map((event, i) => (
            <div key={i} className="eventRow">
              {event}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default OrganizerProfile;
