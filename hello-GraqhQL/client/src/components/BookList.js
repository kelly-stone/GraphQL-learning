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
//fetch all the books infor will pass to the props below

class BookList extends Component {
  render() {
    console.log(this.props); //after refreshing, there are two different data{} in console.log from different port
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
