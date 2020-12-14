import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { getAllEvents } from "../../services/events";
import "./Allevents.css";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Allevents.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import turf from "turf";

const AllEvents = (props) => {
  const [userPosition, setUserPosition] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 41.1496,
    longitude: -8.61099,
    zoom: 5,
    bearing: 0,
    pitch: 30,
  });

  const mapRef = useRef();
  const geocoderContainerRef = useRef();

  useEffect(() => {
    console.log("mount");

    getAllEvents().then((events) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPosition = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setUserPosition(userPosition);
        const eventsWithDistance = events.map((event) => {
          let from = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: userPosition,
            },
          };
          let to = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [event.lat, event.long],
            },
          };

          let distance = turf.distance(from, to, "kilometers");
          return { ...event, distance: distance, going: event.players.length };
        });
        setEvents(eventsWithDistance);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="eventsPage">
      <div className="leftPannel">
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <h2>Closest to Me 🧞‍♂️</h2>
            <div className="cardRow">
              {events
                .sort((a, b) => a.distance - b.distance)
                .map((el) => (
                  <Link to={`/event/${el._id}`}>
                    <div className="eventCard">
                      <p>{el.name}</p>
                      <p>Going: {el.going}</p>
                      <p>{el.format}</p>
                      <p>{Math.round(el.distance)} Km</p>
                    </div>
                  </Link>
                ))}
            </div>
            <h2>Trending 🌶</h2>
            <div className="cardRow">
              {events
                .sort((a, b) => b.going - a.going)
                .map((el) => (
                  <Link to={`/event/${el._id}`}>
                    <div className="eventCard">
                      <p>{el.name}</p>
                      <p>Going: {el.going}</p>
                      <p>{el.format}</p>
                    </div>
                  </Link>
                ))}
            </div>
            <h2>Starting Soon 😱</h2>
            <div className="cardRow">
              {events
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((el) => (
                  <Link to={`/event/${el._id}`}>
                    <div className="eventCard">
                      <p>{el.name}</p>
                      <p>Going: {el.going}</p>
                      <p>{el.format}</p>
                      <p>{new Date(el.date).toISOString().substring(12, 16)}</p>
                      <p>{new Date(el.date).toISOString().substring(0, 10)}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>

      <div className="rightPannel">
        <div
          ref={geocoderContainerRef}
          style={{ position: "relative", top: 20, left: 0, zIndex: 0 }}
        />
        <ReactMapGL
          {...viewport}
          ref={mapRef}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          width="100%"
          height="100vh"
          mapStyle={"mapbox://styles/mapbox/basic-v9"}
          mapboxApiAccessToken={
            "pk.eyJ1IjoieGlreiIsImEiOiJja2luMWxod3owa2VrMnhxczF3cHo0Y2FpIn0.6EG6l8fbS8yp3vNXmZBJlA"
          }
        >
          <Geocoder
            mapRef={mapRef}
            // containerRef={geocoderContainerRef}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken={
              "pk.eyJ1IjoieGlreiIsImEiOiJja2luMWxod3owa2VrMnhxczF3cHo0Y2FpIn0.6EG6l8fbS8yp3vNXmZBJlA"
            }
            position="top-left"
          />

          {events &&
            events.map((event) => (
              <Marker
                latitude={Number(event.lat)}
                longitude={Number(event.long)}
                offsetLeft={-20}
                offsetTop={0}
              >
                <div className="eventImage">
                  <img src="../../../images/eventicon.png" />
                </div>
              </Marker>
            ))}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default AllEvents;
