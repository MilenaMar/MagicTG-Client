import React, { Component } from 'react';
import { addComment } from '../../services/comments';

export default class Comment extends Component {
  state = {
    comment: '',
      }
    
      handleChange = (event) => {
        console.log(event.target.name, ": ", event.target.value);
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
      console.log("res:", res);
      if (!res.status) {
        // deal with the error
        return;
      }
      this.setState({comment:''})
    });
      }
     
    render() {
      return (
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
      );
    }
  }