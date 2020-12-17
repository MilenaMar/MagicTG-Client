import React from "react";
import { Link } from "react-router-dom";
import "./EventR.css"

const EventR = (props) => {
const event = props.event
  return <div className="EventR">
  <Link to={`/event/${event._id}`}><button>Event details</button></Link>
  <div className="event-details">
  <strong><p>{props.event.name}</p></strong>
  <p>Date: {props.event.date.toString().slice(0,10)}</p>
  <p>Time: {props.event.date.toString().slice(12,16)} </p>
  <p>Location: {props.event.location}</p>
  </div>
  </div>;
};

export default EventR;

