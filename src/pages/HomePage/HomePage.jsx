import React, {Component} from 'react';
import "./HomePage.css";
import "../../App.css"
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render (){
  return (
    <div>
    <div className="Home">
    <div className="home fadeInRight">
    <p>Welcome to</p>
    <p>Magic</p>
    <p>The real gathering</p>
    <p>Experience</p>
    <div className="about-us">Build a community with players around the world,
     <br/> Check out the latest Magic TG events <br/>
      Join us today ! <Link to="/auth/signup" className="nav-logoutbtn homebutton">
              Signup
            </Link> </div>
    </div>
    </div>
    </div>
  );
}
}

