import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading/index.jsx";
import { getSingleEvent, attendEvent } from "../../services/events.js";

export default class SingleEvent extends Component {
  state = {
    eventInfo: null,
    loading: true,
    inicial: "attend",
    updated: false,
    count:null,
  };
  componentDidMount = () => {
    getSingleEvent(this.props.match.params.id).then((res) => {
      console.log("res:", res);
      this.setState({ eventInfo: res, loading: false, count:res.players.length });
    });
  };
  updateAttendance=()=> {
      attendEvent(this.props.match.params.id, this.props.user._id).then((res) => {
        this.setState({
          inicial: "unnatend",
          updated: true,
      })
    })
  }

  render() {
    const event = this.state.eventInfo;
    if (this.state.loading) {
        return <LoadingComponent/>;
      }

    return (
      <div>
        <h1>Single Event</h1>
        <h2>Name of the event: {event.name}</h2>
        <h3>Organizer of the event: {event.organizer[0].username}</h3>
        <img src={event.organizer[0].avatar} alt="organizer avatar"></img>
        
        {event.organizer[0]._id === this.props.user._id ?
         <Link to={`/event/edit/${event._id}`}> Edit Event </Link>
          : <div>
        <button onClick={this.updateAttendance}>{this.state.inicial}</button>
        <p>{this.state.count}</p>
      </div>
      }
      </div>
    );
  }
}
