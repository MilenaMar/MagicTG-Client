import React, { Component } from "react";
import { Link } from "react-router-dom";
import AttendButton from "../../components/attendButton/Attend.jsx";
import ListComments from "../../components/ListComments/ListComments.jsx";
import LoadingComponent from "../../components/Loading/index.jsx";
import {
  getSingleEvent,
  attendEvent,
  unattendEvent,
} from "../../services/events.js";
import "./SingleEvent.css"

export default class SingleEvent extends Component {
  state = {
    eventInfo: null,
    loading: true,
    attending: true,
    state: false,
    card:null
  };

  async loadEvent() {
    getSingleEvent(this.props.match.params.id).then((res) => {
      let going;
      this.setState({
        eventInfo: res,
        loading: false,
      }); 
      if (res.players.length !== 0) {
        going = res.players.find((e) =>  e._id === this.props.user._id
        );
      } 
      if (going) {
        return this.setState({ attending: true });
      }
      return this.setState({ attending: false });
    });
  }

  componentDidMount = () => {

    this.loadEvent();
  };

  hanleAttend = () => {
    attendEvent(this.props.match.params.id, this.props.user._id).then((res) => {
      this.loadEvent();
    });
  };

  handleUnattended = () => {
    unattendEvent(this.props.match.params.id, this.props.user._id).then(
      (res) => {
        this.loadEvent();
      }
    );
  };

  render() {
    const event = this.state.eventInfo;
    let handler;
    let message;
    if (this.state.loading) {
      return <LoadingComponent />;
    }
    if (this.state.attending) {
      handler = this.handleUnattended;
      message = "Attending Event";
    } else {
      handler = this.hanleAttend;
      message = "Attend Event";
    }
    return (
      <div className="SingleEvent" style={{backgroundImage: `url(${event.image})`,backgroundPosition: 'top',}}>

        <div className="event-description" >
         <div className="event-detailsEvent">
        <h1>{event.name}</h1>
        <h3>Organized by: {event.organizer[0].username}</h3>
        <h4>{event.location}</h4>
        <h4>Format: {event.format}</h4>
        <h4>Date: {event.date.toString().slice(0,10)}</h4>
        <h4>Time: {event.date.toString().slice(12,16)}</h4>
        <p className="maxplayers">Maximum number of Players: {event.maxPlayers} players</p>
        <p>Description: see you there guys</p>
        {event.organizer[0]._id === this.props.user._id ? (
          <Link to={`/event/edit/${event._id}`}> <button clasName="editEv">Edit Event</button> </Link>
        ) : (
          <div></div>
        )}
        {this.props.user.userType === "Organizer" ? (
          <div></div>
        ) : (
          <div className ="atd">
            <AttendButton handler={handler} event={message} />
          </div>
        )}
        </div> 
        <div className="players-list">
        <h2> Players attending this Event </h2>
         <div className="listplayers">
        {event.players? event.players.map((e)=> <p key={e._id}><Link to={`/user/player/${e.username}`} className="links-to-userprofile">{e.username}</Link></p>):<div></div>}
        </div>
         <div className="chat-event">
        <ListComments 
        eventid={this.props.match.params.id} 
        user={this.props.user}
         eventInfo={this.state.eventInfo}
         />
         </div>
        </div>
         </div>
      </div>
    );
  }
}
