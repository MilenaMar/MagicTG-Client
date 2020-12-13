import React, { Component } from 'react';
import { addComment } from '../../services/comments';

export default class Comment extends Component {
  state = {
          comment: '',
      }
    
    onChange(e){
        this.setState({
            comment : e.target.value
        });
    }
  
     handleSubmmit = (e) => {
       e.preventDefault();
       const comment = {
           comment : this.state.comment,
       }
       addComment(comment,this.props.user.username,this.props.eventId).then(
        (res) => {
          if (!res.status) {
            //  deal with the error
            return;
          }
          console.log(res)
        }
       )
      }
     
    render() {
      return (
        <div>
        <h3>Add a Comment</h3>
        <form onSubmit={this.handleSubmmit} >
            <div className="form-group">
              <textarea rows="5"
                  required
                  className="form-control"
                  value={this.state.comment}
                  placeholder="Type a comment"
                  onChange={this.onChange}>
              </textarea>
              <button>Submit Comment</button>
            </div>
        </form>
        </div>
      );
    }
  }