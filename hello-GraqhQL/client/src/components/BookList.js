import React, { Component } from "react";
import { graphql } from "react-apollo";

class BookList extends Component {
  render() {
    return (
      <div>
        <ul id="book-list">
          <li>Book name</li>
        </ul>
      </div>
    );
  }
}

export default graphql(BookList);
