import React from "react";

class OrganizerProfile extends React.Component {
  state = {
    user: this.props.user,
  };

  render() {
    return <div>{this.state.user.username}</div>;
  }
}

export default OrganizerProfile;
