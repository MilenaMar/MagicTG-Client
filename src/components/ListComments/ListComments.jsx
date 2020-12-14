import React, { Component } from 'react';
import { getComments } from '../../services/comments';
import { addComment } from '../../services/comments';
import LoadingComponent from '../Loading';

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
      <div>
      {this.state.comments ? comments.map((e)=> <div key={e._id}><h1>{e.body}</h1></div>):<h2>No comments</h2>}
      <div>
        <h3>Add a Comment</h3>
        <form onSubmit={this.handleSubmmit} >
        <textarea rows="5"
          type="text"
          name="comment"
          value={this.state.comment}
          onChange={this.handleChange}
          placeholder="Type your comment here"
        />
        <button>Submit Comment</button>
        </form>
        </div>
     </div>
    );
  }
}