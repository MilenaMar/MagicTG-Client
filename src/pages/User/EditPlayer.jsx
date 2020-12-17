import React, { Component } from "react";
import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} from "../../services/userPlayer";
import "./EditPlayer.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle, Email, LocationOn } from "@material-ui/icons";


export default class EditProfile extends Component {
  state = {
    user: this.props.user,
    newPassword: "",
  };

  componentDidMount = () => {
    getUserProfile(this.props.match.params.username).then((responseBack) => {
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
        if (!res.status) {
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
        return;
      }
      this.props.history.push(`/user/player/${res.data.userUpdated.username}`);
    });
  };

  render() {
    return (
      <div className="Signup">
        <div className="auth__form">
          <h1 style={{ margin: "0px" }}>Profile</h1>
          <form className="other" onSubmit={this.handleSubmit}>
            <TextField
              style={{ margin: "10px 0px" }}
              id="filled-multiline-flexible"
              name="username"
              placeholder="Userame"
              multiline
              required
              value={this.state.user.username}
              onChange={this.handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ margin: "10px 0px" }}
              id="filled-multiline-flexible"
              name="email"
              placeholder="Email"
              multiline
              required
              value={this.state.user.email}
              onChange={this.handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ margin: "10px 0px" }}
              id="filled-multiline-flexible"
              name="location"
              placeholder="Location"
              multiline
              required
              value={this.state.user.location}
              onChange={this.handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
            <button className="submitButton" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    );
  }
}
