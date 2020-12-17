import React from "react";
import { addNewEvent } from "../../services/events.js";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle, DateRange } from "@material-ui/icons";
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
            {/* <InputLabel required shrink htmlFor="standard-adornment-password">
            Password
          </InputLabel> */}
            {/* <Input
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
          /> */}

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
