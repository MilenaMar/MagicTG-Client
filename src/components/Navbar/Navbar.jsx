import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom"
import "./Navbar.css";
import {FaRegUser} from  'react-icons/fa';


class  Navbar extends Component {
  changeTitle = () => {
    if(window.location.pathname === "/"){
        return 'Homenav';
    }
    return 'generalNav'
  }
 render () {
   let title = this.changeTitle();
  let link;
  if (this.props.user && this.props.user.userType === "Organizer") {
    link = `/user/organizer/${this.props.user.username}`;
  } else if (this.props.user && this.props.user.userType === "Player") {
    link = `/user/player/${this.props.user.username}`;
  }
  return (
    <div>
    <nav className={title}>
      <Link to="/" className='nav__projectName'>
        <img
          src={process.env.PUBLIC_URL + "/images/mtglogo.png"}
          alt="Logo"
          className="logo"
        />
      </Link>

      <div className="nav__authLinks">
      <Link to="/" className="authLink">
          Home Page
        </Link>
        <Link to="/events" className="authLink">
          Events
        </Link>
        {this.props.user ? (
          <>
            <Link to={link} className="authLink">
            <FaRegUser size={30} />
            </Link>
            <button className="nav-logoutbtn" onClick={this.props.handleLogout}>
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
    </div>
  )
}

};

export default withRouter(Navbar);
