import React, { Component } from 'react';
import { getComments } from '../../services/comments';
import { addComment } from '../../services/comments';
import LoadingComponent from '../Loading';
import "./ListComments.css"


export default class ListComments extends Component {

  state = {
    comments:null,
    loading: true,
    comment: '',
    }

    async loadComments() {
      getComments(this.props.eventid).then((res) => {
        this.setState({comments:res.data, loading: false,})
})
    }
   
   componentDidMount = ()=>{
 this.loadComments()
   }

   handleChange = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };


 handleSubmmit = (e) => {
   e.preventDefault();
   const comment = {
       comment : this.state.comment,
       username: this.props.user.username,
       eventInfo:this.props.eventInfo._id
   }
  addComment(comment).then((res) => {
  if (!res.status) {
    // deal with the error
    return;
  }
  this.setState({comment:''})
  this.loadComments();

});
  }


  render() {
    let comments= this.state.comments
    if (this.state.loading) {
        return <LoadingComponent />;
      }
    return (
      <div className="chat">
      <div className="display">
      {this.state.comments ? comments.map((e)=> <div key={e._id} className="comment">
      <h4>{e.author}</h4>
      <p>{e.body}</p>
      </div>):<h2>No comments</h2>}
      </div>
      <div >
        <form onSubmit={this.handleSubmmit} className="new-comment" >
        <textarea rows="5" cols="55"
        maxLength='180'
          type="text"
          name="comment"
          value={this.state.comment}
          onChange={this.handleChange}
          placeholder="New comment"
        />
        <button>Submit Comment</button>
        </form>
        </div>
        </div>
    );
  }
}