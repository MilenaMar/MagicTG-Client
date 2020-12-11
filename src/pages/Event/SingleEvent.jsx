import React, { Component } from "react";
import LoadingComponent from "../../components/Loading/index.jsx";
import { getSingleEvent } from "../../services/events.js";

export default class SingleEvent extends Component {
  state = {
    eventInfo: null,
    loading: true,
  };

  componentDidMount = () => {
    getSingleEvent(this.props.match.params.id).then((res) => {
      console.log("res:", res);
      this.setState({ eventInfo: res, loading: false });
    });
  };
  render() {
    const event = this.state.eventInfo;
    if (this.state.loading) {
      return <LoadingComponent />;
    }

    return (
      <div>
        <h1>Single Event</h1>
        <h2>Name of the event: {event.name}</h2>
        <h3>Organizer of the event: {event.organizer[0].username}</h3>
        <img src={event.organizer[0].avatar} alt="organizer avatar"></img>
      </div>
    );
  }
}
