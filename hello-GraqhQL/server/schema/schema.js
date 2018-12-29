const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

// const books = [
//   { name: "BOOK1", genre: "IT", id: "1", authorId: "1" },
//   { name: "BOOK2", genre: "Drama", id: "2", authorId: "2" },
//   { name: "BOOK3", genre: "Romance", id: "3", authorId: "3" },
//   { name: "BOOK4", genre: "Drama", id: "4", authorId: "1" },
//   { name: "BOOK5", genre: "Romance", id: "5", authorId: "2" }
// ];

// // console.log(_.find(books, { id: "2" }));

// const authors = [
//   { name: "hfpp2012", age: 27, id: "1" },
//   { name: "fdsa365", age: 30, id: "2" },
//   { name: "lili", age: 21, id: "3" }
// ];

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
        //return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
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
        //console.log(parent);
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
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

        //return _.find(books, { id: args.id });
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      }
    },

    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        //return books;
        return Book.find({});
      }
    },

    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        //how to show the new author
        let author = new Author({
          //Author is from models/author (top, require)
          name: args.name,
          age: args.age
        });
        return author.save(); //remember return
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        //how to show the new author
        let book = new Book({
          //Book is from models/book (top, require)
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save(); //remember return
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery, //query is like looking for the data
  mutation: Mutation //mutation is like edit data
});
