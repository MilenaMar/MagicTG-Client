import React from "react";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import LogIn from "./pages/LogIn";
import Signup from "./pages/SignUp/Signup";
import PlayerProfile from "./pages/User/PlayerProfile";
import EditPlayer from "./pages/User/EditPlayer";
import OrganizerProfile from "./pages/User/OrganizerProfile";
import NormalRoute from "./routing-components/NormalRoute";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import { getLoggedIn, logout } from "./services/authPlayer";
import { getAllEvents } from "./services/events";
import * as PATHS from "./utils/paths";
import EditProfileOrganizer from "./pages/User/EditProfileOrganizer";
import NewEvent from "./pages/Event/NewEvent";
import EditEvent from "./pages/Event/EditEvent.jsx";
import SingleEvent from "./pages/Event/SingleEvent";
import AllEvents from "./pages/Event/AllEvents";

class App extends React.Component {
  state = {
    user: null,
    isLoading: true,
    events: null,
    location: "",
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userType = localStorage.getItem("userType");

    if (!accessToken) {
      return this.setState({
        isLoading: false,
      });
    }

    getAllEvents().then((responseBack) => {
      this.setState({ events: responseBack });
    });

    getLoggedIn(userType).then((res) => {
      if (!res.status) {
        console.log("RES IN CASE OF FAILURE", res);
        return this.setState({
          isLoading: false,
        });
      }
      this.setState({
        user: userType === "Organizer" ? res.data.organizer : res.data.player,
        isLoading: false,
      });
    });
  };

  handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return this.setState({
        user: null,
        isLoading: false,
      });
    }
    this.setState(
      {
        isLoading: true,
      },
      () => {
        logout(accessToken).then((res) => {
          if (!res.status) {
            console.log("SOMETHING HAPPENED", res);
          }
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userType");
          return this.setState({
            isLoading: false,
            user: null,
          });
        });
      }
    );
  };

  authenticate = (user) => {
    this.setState({
      user,
    });
  };

  update = (event) => {
    this.setState({
      event,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    }

    return (
      <div className="App">
        <Navbar handleLogout={this.handleLogout} user={this.state.user} />
        <Switch>
          <NormalRoute exact path={PATHS.HOMEPAGE} component={HomePage} />
          <NormalRoute exact path={PATHS.PAGENOFOUND} component={NotFound} />
          <NormalRoute
            exact
            path={PATHS.SIGNUPPAGE}
            authenticate={this.authenticate}
            component={Signup}
          />
          <NormalRoute
            exact
            path={PATHS.LOGINPAGE}
            authenticate={this.authenticate}
            component={LogIn}
          />
          <ProtectedRoute
            exact
            path={PATHS.PROFILEPAGEPLAYER}
            component={PlayerProfile}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={PATHS.EDITPAGEPLAYER}
            component={EditPlayer}
            user={this.state.user}
            authenticate={this.authenticate}
          />
          <ProtectedRoute
            exact
            path="/user/organizer/:username"
            component={OrganizerProfile}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={"/user/organizer/:username/edit-profile"}
            component={EditProfileOrganizer}
            user={this.state.user}
            authenticate={this.authenticate}
          />
          <ProtectedRoute
            exact
            path={"/event/new"}
            component={NewEvent}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={"/event/edit/:_id/"}
            component={EditEvent}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={PATHS.EVENTPAGE}
            component={SingleEvent}
            user={this.state.user}
          />
          <NormalRoute
            exact
            path={"/events"}
            user={this.state.user}
            component={AllEvents}
          />
          AllEvents
        </Switch>
      </div>
    );
  }
}

export default App;
