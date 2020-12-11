import React from "react";
import { Link } from "react-router-dom";

const EventR = (props) => {
const event = props.event
  return <div><Link to={`/event/${event._id}`}><h1>{props.event.name}</h1></Link></div>;
};

export default EventR;

