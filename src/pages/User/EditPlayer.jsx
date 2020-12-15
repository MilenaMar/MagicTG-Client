import React, { Component } from "react";
import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} from "../../services/userPlayer";
import "./EditPlayer.css";

export default class EditProfile extends Component {
  state = {
    user: this.props.user,
    newPassword: "",
  };

  componentDidMount = () => {
    getUserProfile(this.props.match.params.username).then((responseBack) => {
      console.log(responseBack)
      if (responseBack.user === null) {
        return this.props.history.push("/page-no-found");
      }
      this.setState({ user: responseBack });
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        [name]: value,
      },
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    updateUserProfile(this.props.match.params.username, this.state.user).then(
      (res) => {
        console.log(res)
        if (!res.status) {
          //  deal with the error
          return;
        }
        this.props.authenticate(res.data.userUpdated);
        this.setState({ user: res.data.userUpdated });
        this.props.history.push(
          `/user/player/${res.data.userUpdated.username}`
        );
      }
    );
  };

  handleSubmitPassword = (event) => {
    event.preventDefault();
    const credentials = this.state.newPassword;
    updateUserPassword(this.props.user.username, credentials).then((res) => {
      if (!res.status) {
        //  deal with the error
        return;
      }
      this.props.history.push(`/user/player/${res.data.userUpdated.username}`);
    });
  };

  render() {
    return (
      <div>
        <form className="profileForm" onSubmit={this.handleSubmit}>
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

        <form onSubmit={this.handleSubmitPassword}>
          <label htmlFor="password"> NeW Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={this.handleChange}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}
