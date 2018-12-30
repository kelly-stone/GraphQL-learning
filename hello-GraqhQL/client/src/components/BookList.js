import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

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

export default graphql(getBookQuery)(BookList);
