import React, { useEffect, useState, useRef } from "react";
import { getAllEvents } from "../../services/events";
import "./Allevents.css";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Allevents.css";
import turf from "turf";
import EventCard from "../../components/EventCard";

const AllEvents = (props) => {
  const [userPosition, setUserPosition] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 41.1496,
    longitude: -8.61099,
    zoom: 0,
    bearing: 0,
    pitch: 0,
  });
  const [sticky, setSticky] = useState(false);

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
          const arrayPlayersId = event.players.map((player) => player._id);

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
          console.log("hello");
          let distance = turf.distance(from, to, "kilometers");
          return {
            ...event,
            distance: distance,
            going: event.players.length,
            arrayPlayersId: arrayPlayersId,
          };
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
            <h2>Closest to Me</h2>
            <div className="cardRow">
              {events
                .sort((a, b) => a.distance - b.distance)
                .map((el) => (
                  <Link to={`/event/${el._id}`}>
                    <EventCard
                      UserGoing={el.arrayPlayersId.includes(props.user._id)}
                      Distance={el.distance}
                      Id={el._id}
                      Name={el.name}
                      Going={el.going}
                      Format={el.format}
                      DateHour={new Date(el.date)
                        .toISOString()
                        .substring(12, 16)}
                      DateDay={new Date(el.date).toISOString().substring(0, 10)}
                      Image={el.image}
                    />
                  </Link>
                ))}
            </div>
            <h2>Trending</h2>
            <div className="cardRow">
              {events
                .sort((a, b) => b.going - a.going)
                .map((el) => (
                  <Link to={`/event/${el._id}`}>
                    <EventCard
                      UserGoing={el.arrayPlayersId.includes(props.user._id)}
                      Distance={el.distance}
                      Id={el._id}
                      Name={el.name}
                      Going={el.going}
                      Format={el.format}
                      DateHour={new Date(el.date)
                        .toISOString()
                        .substring(12, 16)}
                      DateDay={new Date(el.date).toISOString().substring(0, 10)}
                      Image={el.image}
                    />
                  </Link>
                ))}
            </div>
            <h2>Starting Soon</h2>
            <div className="cardRow">
              {events
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((el) => (
                  <Link to={`/event/${el._id}`}>
                    <EventCard
                      UserGoing={el.arrayPlayersId.includes(props.user._id)}
                      Distance={el.distance}
                      Id={el._id}
                      Name={el.name}
                      Going={el.going}
                      Format={el.format}
                      DateHour={new Date(el.date)
                        .toISOString()
                        .substring(12, 16)}
                      DateDay={new Date(el.date).toISOString().substring(0, 10)}
                      Image={el.image}
                    />
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>

      <div className="rightPannel">
        <h2>The Real Gathering Sights</h2>
        <div className="mapbox">
          <div
            ref={geocoderContainerRef}
            style={{
              position: "relative",
              top: 20,
              left: 0,
              zIndex: 0,
            }}
          />
          <ReactMapGL
            {...viewport}
            ref={mapRef}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            width="100%"
            height="400px"
            mapStyle={"mapbox://styles/xikz/ckirobijq062z19mhitx2z914"}
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
                    <img src="../../../images/eventicon.png" alt="event icon" />
                  </div>
                </Marker>
              ))}
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
};
export default AllEvents;
