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
//import {getRandom} from "../../services/cardsService";

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
   // getRandom().then((response)=> {this.setState({ card: response.data.data })})
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
  let img;
    
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
  // if (this.state.card){
  //  img = <img src={this.state.card.image_uris.normal} alt="random card"/>
  // }
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
            <AttendButton handler={handler} event={message} />
          </div>
        )}
        <ListComments 
        eventid={this.props.match.params.id} 
        user={this.props.user}
         eventInfo={this.state.eventInfo}
         />
      </div>
    );
  }
}
