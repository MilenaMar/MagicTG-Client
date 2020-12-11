import React from "react";
import {
  getOrganizerProfile,
  updateOrganizerProfile,
} from "../../services/events";
import { Link } from "react-router-dom";
import { getSingleEvent, updateSingleEvent } from "../../services/events";

export default class EditEvent extends React.Component {
  state = {
    user: this.props.user,
    event: {},
  };

  componentDidMount = () => {
    getSingleEvent(this.props.match.params._id).then((responseBack) => {
      if (responseBack.user === null) {
        return this.props.history.push("/page-no-found");
      }
      this.setState({ event: responseBack });
    });
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
    updateSingleEvent(this.props.match.params.username, this.state.user).then(
      (res) => {
        if (!res.status) {
          //  deal with the error
          return;
        }

        this.setState({ user: res.data.userUpdated });
        this.props.history.push(
          `/user/organizer/${res.data.userUpdated.username}`
        );
      }
    );
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
