import React, { Component } from "react";
import { login } from "../services/authPlayer";
import { loginOrg } from "../services/authOrganizer";
import { Redirect } from "react-router-dom";
import * as PATHS from "../utils/paths";
import "./SignUp/Signup";
import "./auth.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle, LockOpen } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    usertype: "Player",
    error: null,
  };

  // Section to Select the Kind of login in if Player or Organizer
  handleClick = (event) => {
    if (this.state.usertype === "Player") {
      this.setState({ usertype: "Organizer" });
    } else {
      this.setState({ usertype: "Player" });
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // If the state of Usertype is Player the form will be sumit here
  handleFormSubmissionasPlayer = (event) => {
    event.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        this.setState({ error: res.errorMessage });
        return <Redirect to={PATHS.LOGINPAGE} />;
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("userType", res.data.user.userType);
      this.props.authenticate(res.data.user);
      this.props.history.push(`/user/player/${res.data.user.username}`);
    });
  };

  // If the state of Usertype is Organizer the form will be sumit here
  handleFormSubmissionasOrganizer = (event) => {
    event.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    loginOrg(credentials).then((res) => {
      if (!res.status) {
        //set state for the error message from the server
        this.setState({ error: res.errorMessage });
        return <Redirect to={PATHS.LOGINPAGE} />;
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("userType", res.data.user.userType);

      this.props.authenticate(res.data.user);
      this.props.history.push(`/user/organizer/${res.data.user.username}`);
    });
  };

  render() {
    // Render the button for the Player or the Organizer with the OnSubmit Handler
    let button;
    let handler;
    if (this.state.usertype === "Player") {
      button = (
        <>
          <div>
            <img
              src="../../../images/goblin2.png"
              style={{ height: "100px" }}
            alt="goblin"/>
          </div>
          <button className="userControllerButton" onClick={this.handleClick}>
            Log In as an Organizer?
          </button>
        </>
      );
      handler = this.handleFormSubmissionasPlayer;
    } else {
      button = (
        <>
          <div>
            <img
              src="../../../images/goblin3.png"
              style={{ height: "100px" }}
           alt="goblin" />
          </div>
          <button className="userControllerButton" onClick={this.handleClick}>
            Login as a Player?
          </button>
        </>
      );
      handler = this.handleFormSubmissionasOrganizer;
    }
    return (
      <div className="Signup">
        <div className="auth__form">
          <h1 style={{ margin: "0px" }}>Loggin In</h1>

          {this.state.usertype === "Player" ? (
            <h3>I'm a Player!</h3>
          ) : (
            <h3>I'm an Organizer!</h3>
          )}

          {button}

          <form onSubmit={handler} className="other">
            <TextField
              style={{ margin: "10px 0px" }}
              id="filled-multiline-flexible"
              name="username"
              placeholder="Userame"
              multiline
              required
              value={this.state.username}
              onChange={this.handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <Input
              style={{ margin: "10px 0px" }}
              placeholder="Password"
              required
              name="password"
              label="With normal TextField"
              id="standard-adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={this.handleInputChange}
              startAdornment={
                <InputAdornment position="start">
                  <LockOpen />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            {this.state.error && (
              <div className="error-block">
                <p>{this.state.error}</p>
              </div>
            )}
            <button className="submitButton" type="submit">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    );
  }
}
