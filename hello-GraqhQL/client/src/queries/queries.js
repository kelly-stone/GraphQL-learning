import gql from "graphql-tag";

const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export { getAuthorsQuery, getBookQuery };
