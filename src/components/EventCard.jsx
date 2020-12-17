import React from "react";
import "./EventCard.css";
import { PeopleAlt, Schedule } from "@material-ui/icons";
import { Link } from "react-router-dom";

const EventCard = (props) => {
  const formatImages = {
    Legacy:
      "https://res.cloudinary.com/xikz/image/upload/v1608114256/Legacy_xyjhgn.png",
    Standard:
      "https://res.cloudinary.com/xikz/image/upload/v1608114256/Standard_p4xuoq.png",
    Pioner:
      "https://res.cloudinary.com/xikz/image/upload/v1608114256/Pioneer_u2j1pz.png",
    Modern:
      "https://res.cloudinary.com/xikz/image/upload/v1608114256/Modern_reomkb.png",
  };

  let eventCardClass = "eventCard";
  let seeEventLink = "seeEventLink";

  if (props.UserGoing) {
    eventCardClass += " rotate";
    seeEventLink += " rotateo";
  }

  return (
    <div className={eventCardClass}>
      <div
        className="cardImage"
        style={{
          backgroundImage: `url("${props.Image}")`,
        }}
      >
        <div className="format">
          <img src={`${formatImages[props.Format]}`} alt="avatar event"/>
          <p>{props.Format}</p>
          <p>{Math.round(props.Distance)} Km </p>
        </div>
      </div>
      <div className="cardInfo">
        <div className="cardName">
          {props.Name.length > 16
            ? props.Name.slice(0, 13) + "..."
            : props.Name.slice(0, 17)}
        </div>
        <div className="cardInfoBody" style={{ color: "rgb(53, 53, 53)" }}>
          <div className="cardGoing align-v">
            <div className="align-h">
              {props.Going} <PeopleAlt fontSize="small" />
            </div>
            <p className="going">Going</p>
          </div>
          <div className="cardDate align-v">
            <div className="align-h">
              {props.DateHour} <Schedule fontSize="small" />
            </div>
            <p className="going">{props.DateDay}</p>
          </div>
        </div>
        <Link className={seeEventLink} to={`/event/${props.Id}`}>
          {props.UserGoing ? "Going" : "See"}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
