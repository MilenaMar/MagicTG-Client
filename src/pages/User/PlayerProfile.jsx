import React, { Component } from "react";
import Event from "../../components/Event/EventR";
import { Link } from "react-router-dom";
import "./PlayerProfile.css";
import { getUserProfile } from "../../services/userPlayer";
import { getAllPlayerEvents } from "../../services/events";
import LoadingComponent from "../../components/Loading";
import {FaUserEdit} from 'react-icons/fa'
import {getCards} from "../../services/cardsService";

export default class PlayerProfile extends Component {
  state = {
    user: this.props.user,
    events: [],
    cards:[],
    loading:true
  };

  componentDidMount = () => {
    getCards().then((response)=> {this.setState({ cards: response.data , loading:false })})
    getUserProfile(this.props.match.params.username).then((responseBack) => {
      if (responseBack.user === null) {
        return this.props.history.push("/page-no-found");
      }
      this.setState({ user: responseBack.user,loading:false });
      getAllPlayerEvents(responseBack.user.username).then((events) => {
        this.setState({ events: events });
      });
    });
    
    
  };

  render() {
    if (this.state.loading) {
      return <LoadingComponent/>;
    }
    
    return (
      <div className="PlayerProfile">
      <div className="buttons-player">
      {this.props.user.username === this.props.match.params.username && (
          <Link to={`/user/player/${this.props.user.username}/edit`}>
           <button> <FaUserEdit size={30} /> Edit My Profile</button> 
          </Link>
        )}
      </div>
      <div className="playerCard">
      <img src="../../../images/lotus.png" alt="lotus" className="lotus"/>
      <div className="player-information">
      <img src={this.state.user.avatar} alt="avatar" className="player-avatar"></img>
      <div>
      <h2> {this.state.user.username}</h2>
      <p> {this.state.user.userType}</p>
      </div>
      </div>
        <h2>My uncomming events</h2>
        {this.state.events.map((e)=> <Event event={e} key={e._id}/>)}
        </div>
        <h2>My Deck</h2>
  <div className="Deck">
{this.state.loading ? <LoadingComponent /> :this.state.cards.map((e)=><img src={e.imageUrl} key={e.number} alt={e.name}></img>)}
</div>
        </div>
    );
  }
}
