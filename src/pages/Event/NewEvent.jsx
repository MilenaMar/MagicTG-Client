import React from "react";
import { addNewEvent } from "../../services/events.js";
import MapboxAutocomplete from "react-mapbox-autocomplete";

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
      <div>
        {this.state.eventAdded && <div>Event Added</div>}

        <form onSubmit={this.handleOnSubmit} className="auth__form">
          <label htmlFor="location">Location</label>
          <MapboxAutocomplete
            publicKey="pk.eyJ1IjoieGlreiIsImEiOiJja2luMWxod3owa2VrMnhxczF3cHo0Y2FpIn0.6EG6l8fbS8yp3vNXmZBJlA"
            inputClass="form-control search"
            onSuggestionSelect={this._suggestionSelect}
            country=""
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
          <label htmlFor="name">Name</label>
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
          </select>

          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewEvent;
