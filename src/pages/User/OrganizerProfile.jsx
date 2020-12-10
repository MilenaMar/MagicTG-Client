import React from "react";
import "./OrganizerProfile.css";
import { Link } from "react-router-dom";

const OrganizerProfile = (props) => {
  const events = [1, 2, 3];

  console.log(props);
  return (
    <div>
      <div className="orgProfile">
        <div>{props.user.username}</div>
        {props.match.params.username === props.user.username ? (
          <Link to={`/user/organizer/${props.user.username}/edit-profile`}>
            <button>Edit profile</button>
          </Link>
        ) : (
          <div></div>
        )}

        <div className="eventsTable">
          <div className="tableHeader">
            <h2>My Events</h2>
            {props.match.params.username === props.user.username ? (
              <Link to={`/event/new`}>
                <button>New Event</button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          {events.map((event, i) => (
            <div key={i} className="eventRow">
              {event}{" "}
              {props.match.params.username === props.user.username ? (
                <Link to="/event/:_id/edit">
                  <button>Edit Event</button>
                </Link>
              ) : (
                <div></div>
              )}
              <Link to="/event/_id">
                <button>See Event</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;
