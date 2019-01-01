import React, { Component } from "react";

import { graphql } from "react-apollo";

import { getAuthorsQuery } from "../queries/queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };

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

  submitForm = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    //console.log(this.props); //after refreshing, there are two different data{} in console.log from different port
    return (
      <form onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <div>
          <button>Add</button>
        </div>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
