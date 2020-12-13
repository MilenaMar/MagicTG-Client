import React, { Component } from 'react';
import { getComments } from '../../services/comments';
import LoadingComponent from '../Loading';

export default class ListComments extends Component {
  state = {
    comments:null,
    loading: true,
    }
   componentDidMount = ()=>{
   const id = {event: this.props.eventid}
    getComments(id).then((res) => {
        this.setState({comments:res.data, loading: false,})
})
   }

  render() {
    let comments= this.state.comments
    if (this.state.loading) {
        return <LoadingComponent />;
      }
    return (
      <div>
      {this.state.comments ? comments.map((e)=> <div key={e._id}><h1>{e.body}</h1></div>):<h2>No comments</h2>}
     </div>
    );
  }
}