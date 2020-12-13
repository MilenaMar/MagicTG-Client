import React, { Component } from 'react';

export default class ListComments extends Component {

  state = {
      comments: null,
    }
  

  componentDidMount(){
  }

  commentList() {  
  }


  render() {
    return (
      <div className="d-flex flex-column">
      <h3>Comments</h3>

        { this.commentList() }
     </div>
    );
  }
}