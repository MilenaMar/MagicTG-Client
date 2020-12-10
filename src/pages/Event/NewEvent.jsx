import React from "react";

class NewEvent extends React.Component {
  state = {
    name: "",
    location: "",
    date: "",
    maxPlayers: "",
    format: "",
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
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
      format: event.target.name,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit} className="auth__form">
          <label htmlFor="location">Location</label>
          <input
            id="location"
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
          <select name="fomat" id="format" form="carform" required>
            <option value="volvo" onClick={this.handleOption}>
              Legacy
            </option>
            <option value="volvo">Modern</option>
            <option value="volvo">Pioner</option>
            <option value="volvo">Standard</option>
          </select>
        </form>
      </div>
    );
  }
}

export default NewEvent;
