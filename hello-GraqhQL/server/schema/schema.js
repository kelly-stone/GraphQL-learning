const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");

const books = [
  { name: "BOOK1", genre: "IT", id: "1" },
  { name: "BOOK2", genre: "Drama", id: "2" },
  { name: "BOOK3", genre: "Romance", id: "3" }
];

// console.log(_.find(books, { id: "2" }));

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // 从哪里得到数据，比如数据库或其他来源
        // Mongodb mysql postgresql

        // console.log(args);

        // console.log(_.find(books, { id: args.id }));
        return _.find(books, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
