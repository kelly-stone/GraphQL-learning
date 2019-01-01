import React, { Component } from "react";

import { graphql } from "react-apollo";

import { getBookQuery } from "../queries/queries";

class BookList extends Component {
  displayBooks = () => {
    const data = this.props.data;
    //from the console.log below(this.props), there is loading:true and false
    if (data.error) {
      return <div>undefined</div>;
    } else if (data.loading) {
      return <div>loading ......</div>;
    } else {
      //from console.log(this.props below)
      return (
        <ul id="book-list">
          {data.books.map(book => {
            return <li key={book.id}>{book.name}</li>;
          })}
        </ul>
      );
    }
  };
  render() {
    //console.log(this.props); //after refreshing, there are two different data{} in console.log from different port
    return (
      <div>
        <ul>{this.displayBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);
