import React, { Component } from "react";
import { login } from "../services/authPlayer";
import { loginOrg } from "../services/authOrganizer";
import { Redirect } from "react-router-dom";
import * as PATHS from "../utils/paths"
import "./Signup";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    usertype:"Player",
    error: null,
  };

// Section to Select the Kind of login in if Player or Organizer
  handleClick = (event) => {
    if(this.state.usertype === "Player"){
      this.setState({usertype:"Organizer"})
    } else {
      this.setState({usertype:"Player"})
    }
  }

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
        //set state for the error message from the server
        this.setState({error:res.errorMessage})
        return <Redirect to={PATHS.LOGINPAGE}/>
      }
      localStorage.setItem("accessToken", res.data.accessToken);
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
        this.setState({error:res.errorMessage})
        return <Redirect to={PATHS.LOGINPAGE}/>
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      this.props.authenticate(res.data.user);
      this.props.history.push("/");
    });
  };

  render() {
    // Render the button for the Player or the Organizer with the OnSubmit Handler 
    let button;
    let handler;
    if (this.state.usertype === "Player"){
     button = <button onClick={this.handleClick}>Sign as Organizer</button>;
     handler = this.handleFormSubmissionasPlayer
    } else {
      button = <button onClick={this.handleClick}>Sign as Player</button>;
      handler = this.handleFormSubmissionasOrganizer
    }

    return (
      <div>
        <h1>Log In</h1>
        {button}
        <form onSubmit={handler} className="signup__form">
          <label htmlFor="input-username">Username</label>
          <input
            id="input-username"
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            minLength="8"
          />

          {this.state.error && (
            <div className="error-block">
              <p>{this.state.error}</p>
            </div>
          )}

          <button className="button__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
