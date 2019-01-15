import React, { Component } from "react";

import { graphql } from "react-apollo";

import { getBookQuery } from "../queries/queries";

export class BookDetails extends Component {
  render() {
    //console.log(this.props); //after refreshing, there are two different data{} in console.log from different port
    return (
      <div id="book-details">
        <p>Output book details here</p>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookDetails);
