const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraqhQLString, GraqhQLSchema } = require("graphql");

const books = [
  { name: "BOOK1", genre: "IT", id: "1" },
  { name: "BOOK2", genre: "Drama", id: "2" },
  { name: "BOOK3", genre: "Romance", id: "3" }
];

console.log(_.find(books, { id: "2" }));
const BookType = GraphQLObjectType({
  name: "Book",
  field: () => ({
    id: { type: GraqhQLString },
    name: { type: GraqhQLString },
    genre: { type: GraqhQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  field: {
    book: {
      type: BookType,
      args: { id: { type: GraqhQLString } },
      resolve(parent, args) {
        // 从哪里得到数据，比如数据库或其他来源
        // Mongodb mysql postgresql
        _.find(books, { id: args.id });
      }
    }
  }
});

module.exports = new GraqhQLSchema({
  query: RootQuery
});
