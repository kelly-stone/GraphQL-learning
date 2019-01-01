import React, { Component } from "react";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

class AddBook extends Component {
  displayAuthors = () => {
    const data = this.props.data;
    //from the console.log below(this.props), there is loading:true and false
    if (data.error) {
      return <div>undefined</div>;
    } else if (data.loading) {
      return <option disabled>loading ......</option>;
    } else {
      //from console.log(this.props below)
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };
  render() {
    console.log(this.props); //after refreshing, there are two different data{} in console.log from different port

    return (
      <form>
        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
