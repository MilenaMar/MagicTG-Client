import React, { Component } from 'react';



export default class AddComment extends Component {
  state = {
          comment: '',
      }
    
    
    onChangeContent(e){
        this.setState({
            comment : e.target.value
        });
    }
  
     handleSubmmit = (e) => {
       e.preventDefault();
       const comment = {
           comment : this.state.comment,
       }
     
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
                  onChange={this.onChangeContent}>
              </textarea>
            </div>
            <div className="form-group" align="right">
              <input type="submit"
                  className="btn btn-dark"
                  value="Post Comment">
              </input>
            </div>
        </form>
        </div>
      );
    }
  }