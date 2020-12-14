import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  let link;
  if (props.user && props.user.userType === "Organizer") {
    link = `/user/organizer/${props.user.username}`;
  } else if (props.user && props.user.userType === "Player") {
    link = `/user/player/${props.user.username}`;
  }
  return (
    <nav>
      <Link to="/" className="nav__projectName">
        <img
          src={process.env.PUBLIC_URL + "/images/mtglogo.png"}
          alt="Logo"
          className="logo"
        />
      </Link>
      <div className="nav__authLinks">
        <Link to="/events" className="authLink">
          Events
        </Link>
        <Link to="/" className="authLink">
          Home Page
        </Link>
        {props.user ? (
          <>
            <Link to={link} className="authLink">
              My profile
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/signup" className="nav-logoutbtn">
              Signup
            </Link>
            <Link to="/auth/login" className="nav-logoutbtn">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
