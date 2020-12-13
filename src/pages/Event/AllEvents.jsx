import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { getAllEvents } from "../../services/events";
import "./Allevents.css";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading";

const AllEvents = (props) => {
  const [events, setEvents] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("mount");
    getAllEvents().then((events) => {
      setEvents(events);
    });
  });

  return (
    <div>
      {/* {loading && <LoadingComponent />} */}
      <div className="cardRow">
        {events.map((el) => (
          <Link to={`/event/${el._id}`}>
            <div className="eventCard">
              <h2>{el.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
