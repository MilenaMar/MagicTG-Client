import React, { Component } from "react";
import { signup } from "../../services/authPlayer";
import { signupOrg } from "../../services/authOrganizer";
//import "./SignUp.css";
import { Redirect } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./SignUp.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle, Email, LockOpen } from "@material-ui/icons";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

export default class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    usertype: "Player",
    error: null,
    showPassword: false,
  };

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
      email: this.state.email,
      password: this.state.password,
    };
    signup(credentials).then((res) => {
      console.log(res);
      if (!res.status) {
        //set state for the error message from the server
        this.setState({ error: res.errorMessage });
        return <Redirect to={PATHS.SIGNUPPAGE} />;
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
      email: this.state.email,
      password: this.state.password,
    };
    signupOrg(credentials).then((res) => {
      console.log(res);
      if (!res.status) {
        //set state for the error message from the server
        this.setState({ error: res.errorMessage });
        return <Redirect to={PATHS.SIGNUPPAGE} />;
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("userType", res.data.user.userType);

      this.props.authenticate(res.data.user);
      this.props.history.push(`/user/organizer/${res.data.user.username}`);
    });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            />
          </div>
          <button className="userControllerButton" onClick={this.handleClick}>
            Join as an Organizer?
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
            />
          </div>
          <button className="userControllerButton" onClick={this.handleClick}>
            Join as a Player?
          </button>
        </>
      );
      handler = this.handleFormSubmissionasOrganizer;
    }
    return (
      <div className="Signup">
        <form onSubmit={handler} className="auth__form">
          <h1 style={{ margin: "0px" }}>Sign Up</h1>

          {this.state.usertype === "Player" ? (
            <h3>... as a Player!</h3>
          ) : (
            <h3>... as an Organizer!</h3>
          )}

          {button}

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
          <TextField
            style={{ margin: "10px 0px" }}
            id="filled-multiline-flexible"
            name="email"
            placeholder="Email"
            multiline
            required
            value={this.state.email}
            onChange={this.handleInputChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          {/* <InputLabel required shrink htmlFor="standard-adornment-password">
            Password
          </InputLabel> */}
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
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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
            SIGN UP
          </button>
        </form>
      </div>
    );
  }
}
