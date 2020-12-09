import React, { Component } from "react";
import { signup } from "../services/authPlayer";
import { signupOrg } from "../services/authOrganizer";
import "./auth.css";

export default class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    usertype:"Player",
    error: null,
  };


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

  handleFormSubmissionasPlayer = (event) => {
    event.preventDefault();
    const credentials = {
      username: this.state.username,
      email: this.state.username,
      password: this.state.password,
    };
    signup(credentials).then((res) => {
      // successful signup
      console.log(res);
      if (!res.status) {
        // unsuccessful signup
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      this.props.authenticate(res.data.user);
      this.props.history.push("/");
    });
  };


  handleFormSubmissionasOrganizer= (event) => {
    event.preventDefault();
    const credentials = {
      username: this.state.username,
      email: this.state.username,
      password: this.state.password,
    };
    signupOrg(credentials).then((res) => {
      // successful signup
      console.log(res);
      if (!res.status) {
        // unsuccessful signup
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      this.props.authenticate(res.data.user);
      this.props.history.push("/");
    });
  };

  render() {
    let button;
    let handler;
    if (this.state.usertype === "Player"){
     button = <button onClick={this.handleClick}>Sign as Organizer</button>;
    } else {
      button = <button onClick={this.handleClick}>Sign as Player</button>;
    }

    if (this.state.usertype === "Player"){
      handler = this.handleFormSubmissionasPlayer
     } else {
      handler = this.handleFormSubmissionasOrganizer
     }

    return (
      <div>
        <h1>Sign Up</h1>
        {button}
        <h2>You are signig in as {this.state.usertype}</h2>
       <form onSubmit={handler} className="auth__form">
          <label htmlFor="input-username">Username</label>
          <input
            id="input-username"
            type="text"
            name="username"
            placeholder="Text"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />
          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="email"
            name="email"
            placeholder="Text"
            value={this.state.email}
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
              <p>There was an error submiting the form:</p>
              <p>{this.state.error.message}</p>
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
