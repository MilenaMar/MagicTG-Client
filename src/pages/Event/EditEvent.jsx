import React from "react";
import { Link } from "react-router-dom";
import {
  getSingleEvent,
  updateSingleEvent,
  deleteSingleEvent,
} from "../../services/events";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle, DateRange } from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import "../SignUp/SignUp.css";

export default class EditEvent extends React.Component {
  state = {
    name: "",
    location: "",
    date: "",
    maxPlayers: "",
    format: "Legacy",
  };

  componentDidMount = () => {
    getSingleEvent(this.props.match.params._id).then((responseBack) => {
      if (responseBack === null) {
        return this.props.history.push("/page-no-found");
      }

      this.setState({
        name: responseBack.name,
        location: responseBack.location,
        date: new Date(responseBack.date).toISOString().substring(0, 16),
        maxPlayers: responseBack.maxPlayers,
        format: responseBack.format,
        lat: responseBack.lat,
        long: responseBack.long,
      });
    });
  };

  deleteEvent = (event) => {
    event.preventDefault();
    deleteSingleEvent(this.props.match.params._id)
      .then((deletedEvent) => {
        this.props.history.push(`/user/organizer/${this.props.user.username}`);
      })
      .catch((err) => console.log(err));
  };

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOption = (event) => {
    event.preventDefault();
    this.setState({
      format: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    updateSingleEvent(this.props.match.params._id, this.state).then((res) => {
      if (!res.status) {
        //  deal with the error
        return;
      }

      this.props.history.push(`/user/organizer/${this.props.user.username}`);
    });
  };

  _suggestionSelect = (result, lat, lng, text) => {
    this.setState({ location: result, lat: lat, long: lng });
  };

  render() {
    return (
      <div className="Signup">
        <div className="auth__form">
          <form onSubmit={this.handleSubmit} className="other">
            <h2 style={{ margin: "0px" }}>Edit Event</h2>

            {this.state.location && (
              <MapboxAutocomplete
                publicKey="pk.eyJ1IjoieGlreiIsImEiOiJja2luMWxod3owa2VrMnhxczF3cHo0Y2FpIn0.6EG6l8fbS8yp3vNXmZBJlA"
                inputClass="form-control search"
                onSuggestionSelect={this._suggestionSelect}
                country=""
                resetSearch={false}
                query={this.state.location}
              />
            )}
            <input
              id="location"
              style={{ display: "none" }}
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.handleInputChange}
              required
            />

            <TextField
              style={{ margin: "10px 0px" }}
              id="filled-multiline-flexible"
              name="name"
              placeholder="Event Name"
              multiline
              required
              value={this.state.name}
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
              id="datetime-local"
              type="datetime-local"
              name="date"
              placeholder="Date & Time"
              required
              value={this.state.date}
              onChange={this.handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRange />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              style={{ margin: "10px 0px" }}
              id="datetime-local"
              type="number"
              name="maxPlayers"
              placeholder="Max Players"
              required
              value={this.state.maxPlayers}
              onChange={this.handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRange />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              style={{ margin: "10px 0px", textAlign: "left" }}
              id="select"
              name="format"
              value={this.state.format}
              select
              onChange={this.handleOption}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRange />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem style={{}} value="Legacy">
                Legacy
              </MenuItem>
              <MenuItem value="Modern">Modern</MenuItem>
              <MenuItem value="Pioner">Pioner</MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
            </TextField>
            {/* <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="date">date</label>
            <input
              id="date"
              type="datetime-local"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="maxPlayers">Max Players</label>
            <input
              id="maxPlayers"
              type="Number"
              name="maxPlayers"
              value={this.state.maxPlayers}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="format">Format</label>
            <select
              onChange={this.handleOption}
              value={this.state.format}
              name="fomat"
              id="format"
              form="carform"
              required
            >
              <option value="Legacy">Legacy</option>
              <option value="Modern">Modern</option>
              <option value="Pioner">Pioner</option>
              <option value="Standard">Standard</option>
            </select> */}

            <button className="submitButton" type="submit">
              SUBMIT
            </button>
          </form>
          <button onClick={this.deleteEvent}>DELETE EVENT</button>
        </div>
      </div>
    );
  }
}
