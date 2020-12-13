import React, { Component } from "react";
import { Link } from "react-router-dom";
import AttendButton from "../../components/attendButton/Attend.jsx";
import Comment from "../../components/Comment/Comment.jsx";
import ListComments from "../../components/ListComments/ListComments.jsx";
import LoadingComponent from "../../components/Loading/index.jsx";
import {
  getSingleEvent,
  attendEvent,
  unattendEvent,
} from "../../services/events.js";

export default class SingleEvent extends Component {
  state = {
    eventInfo: null,
    loading: true,
    attending: false,
    state: false,
  };

  async loadEvent () {
    getSingleEvent(this.props.match.params.id).then((res) => {
    let going;
    this.setState({
      eventInfo: res,
      loading: false,
    });
    if(res.players.length !== 0){
    going = res.players.find((e)=> e._id === this.props.user_id)
    }
    if (going){
     return this.setState({attending:true})
    } 
      return this.setState({attending:false})
  });
}

  componentDidMount = () => {
    this.loadEvent();
  };


 hanleAttend = () => {
     attendEvent(this.props.match.params.id, this.props.user._id).then(
       (res) => {this.loadEvent() }
     );
      }

handleUnattended = () => {
  unattendEvent(this.props.match.params.id, this.props.user._id).then(
    (res) => { this.loadEvent() }
  );
}

  render() {
    const event = this.state.eventInfo;
    let handler;
    let message;
    if (this.state.loading) {
      return <LoadingComponent />;
    }
    if (this.state.attending) {
      handler = this.handleUnattended
      message = "Attending Event" 
    } else {
      handler = this.hanleAttend
      message = "Attend Event"
    }
    return (
      <div>
        <h1>Single Event</h1>
        <h2>Name of the event: {event.name}</h2>
        <h3>Organizer of the event: {event.organizer[0].username}</h3>
        <img src={event.organizer[0].avatar} alt="organizer avatar"></img>
        {event.organizer[0]._id === this.props.user._id ? (
          <Link to={`/event/edit/${event._id}`}> Edit Event </Link>
        ) : (
          <div></div>
        )}
        {this.props.user.userType === "Organizer" ? (
          <div></div>
        ) : (
          <div>
          <AttendButton  handler={handler} event={message}/>
          </div>
        )}
        <ListComments eventid={this.props.match.params.id} />
        <Comment user={this.props.user} eventInfo={this.state.eventInfo} />
      </div>
    );
  }
}
