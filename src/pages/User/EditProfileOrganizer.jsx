import React from "react";
import {
  getOrganizerProfile,
  updateOrganizerProfile,
} from "../../services/userOrganizer";
import "../SignUp/SignUp.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle, Email, LocationOn } from "@material-ui/icons";

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
      <div className="Signup">
        <div className="auth__form">
          <form className="other" onSubmit={this.handleSubmit}>
            <h2>Profile</h2>

            <TextField
              id="filled-multiline-flexible"
              label="Username"
              name="username"
              multiline
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
              id="filled-multiline-flexible"
              label="email"
              name="email"
              multiline
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
              id="filled-multiline-flexible"
              label="location"
              name="location"
              multiline
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
