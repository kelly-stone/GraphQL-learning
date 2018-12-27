const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require("graphql");

const books = [
  { name: "BOOK1", genre: "IT", id: "1", authorId: "1" },
  { name: "BOOK2", genre: "Drama", id: "2", authorId: "2" },
  { name: "BOOK3", genre: "Romance", id: "3", authorId: "3" },
  { name: "BOOK4", genre: "Drama", id: "4", authorId: "1" },
  { name: "BOOK5", genre: "Romance", id: "5", authorId: "2" }
];

// console.log(_.find(books, { id: "2" }));

const authors = [
  { name: "hfpp2012", age: 27, id: "1" },
  { name: "fdsa365", age: 30, id: "2" },
  { name: "lili", age: 21, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // console.log(parent);
        return _.find(authors, { id: parent.id });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log(parent);
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // 从哪里得到数据，比如数据库或其他来源
        // Mongodb mysql postgresql

        // console.log(args);

        //console.log(typeof args.id);

        // console.log(_.find(books, { id: args.id }));
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
