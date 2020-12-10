import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../services/userPlayer";

export default class EditProfile extends Component {
  state = {
    user: this.props.user,
  };

  componentDidMount = () => {
    getUserProfile(this.props.computedMatch.params.username).then(
      (responseBack) => {
        if (responseBack.user === null) {
          return this.props.history.push("/page-no-found");
        }
        console.log("responseBack:", responseBack);
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
    updateUserProfile(
      this.props.computedMatch.params.username,
      this.state.user
    ).then((res) => {
      if (!res.status) {
        //  deal with the error
        return;
      }
      console.log("res:", res);
      this.props.history.push(`/user/player/${res.data.userUpdated.username}`);
      //  was successful
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div>Im a edit page {this.props.user.username}</div>
        {<Link to={`/user/player/${this.props.user.username}`}>GO BACK</Link>}
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
