import React from "react";
import { addNewEvent } from "../../services/events.js";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  ViewCarousel,
  Group,
  DateRange,
  EmojiEvents,
} from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import "../SignUp/SignUp.css";

class NewEvent extends React.Component {
  state = {
    name: "",
    location: "",
    date: "",
    maxPlayers: "",
    format: "Legacy",
    lat: "",
    long: "",
    eventAdded: false,
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    const newEvent = {
      name: this.state.name,
      location: this.state.location,
      date: this.state.date,
      maxPlayers: this.state.maxPlayers,
      format: this.state.format,
      lat: this.state.lat,
      long: this.state.long,
    };

    addNewEvent(newEvent).then((resp) => {
      this.setState({ eventAdded: true });
      this.props.history.push(`/user/organizer/${this.props.user.username}`);
    });
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

  _suggestionSelect = (result, lat, lng, text) => {
    this.setState({ location: result, lat: lat, long: lng });
  };

  render() {
    return (
      <div className="Signup">
        <div className="auth__form">
          <form onSubmit={this.handleOnSubmit} className="other">
            <h2 style={{ margin: "0px" }}>New Event</h2>
            <div>
              <img
                style={{ height: "100px", marginTop: "10px" }}
                src="../../../images/papyrusandfeather.png"
              alt="new event"/>
            </div>

            <MapboxAutocomplete
              publicKey="pk.eyJ1IjoieGlreiIsImEiOiJja2luMWxod3owa2VrMnhxczF3cHo0Y2FpIn0.6EG6l8fbS8yp3vNXmZBJlA"
              inputClass="form-control helo"
              onSuggestionSelect={this._suggestionSelect}
              country=""
              placeholder="Address"
              resetSearch={false}
            />

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
                    <EmojiEvents />
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
                    <Group />
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
                    <ViewCarousel />
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
            {this.state.error && (
              <div className="error-block">
                <p>{this.state.error}</p>
              </div>
            )}

            <button className="submitButton" type="submit">
              ADD EVENT
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewEvent;
