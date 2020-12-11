import React from "react";
import {
  getOrganizerProfile,
  updateOrganizerProfile,
} from "../../services/userOrganizer";
import { Link } from "react-router-dom";

export default class EditProfileOrganizer extends React.Component {
  state = {
    user: this.props.user,
  };

  componentDidMount = () => {
    getOrganizerProfile(this.props.match.params.username).then(
      (responseBack) => {
        if (responseBack.user === null) {
          return this.props.history.push("/page-no-found");
        }
        this.setState({ user: responseBack });
      }
    );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    updateOrganizerProfile(
      this.props.match.params.username,
      this.state.user
    ).then((res) => {
      if (!res.status) {
        //  deal with the error
        return;
      }

      this.props.authenticate(res.data.userUpdated);
      this.setState({ user: res.data.userUpdated });
      this.props.history.push(
        `/user/organizer/${res.data.userUpdated.username}`
      );
    });
  };

  render() {
    return (
      <div>
        <div>Im a edit page {this.props.user.username}</div>
        {
          <Link to={`/user/organizer/${this.props.user.username}`}>
            GO BACK
          </Link>
        }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.user.username}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.user.email}
            onChange={this.handleChange}
          />
          <label htmlFor="location">Location</label>
          <input
            type="location"
            id="location"
            name="location"
            value={this.state.user.location}
            onChange={this.handleChange}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}
