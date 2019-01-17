const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
let books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    id: '1',
    bookStore: '234'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    id: '2',
    bookStore: '234'
  },
  {
    title: 'Secrets of the Javascript Ninja',
    author: 'Bear Bibeault and John Resig',
    id: '3',
    bookStore: '234'
  },
  {
    title: 'The Grand Design',
    author: 'Stephen Hawking && ...',
    id: '4',
    bookStore: '234'
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R. Tolkien',
    id: '5',
    bookStore: '234'
  }
];

const bookStores = [
  {
    name: 'Barnes and Noble',
    id: '234',
    location: 'Fort Collins'
  },
  {
    name: 'Book Haven',
    id: '0983',
    location: 'Loveland'
  }
]



// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Book {
    title: String!
    author: String!
    id: ID!
  }

  type BookStore {
    name: String!
    location: String!
    id: ID!
  }

  type Mutation {
    createBook(id: ID!, title: String!, author: String!): Book!
  }

  # The "Query" type is the root of all GraphQL queries.

  type Query {
    books: [Book]
    bookStores: [BookStore]
    book(id: ID!): Book
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    bookStores: () => bookStores,
    book: (parent, { id }) => {
      return books.find((book) => book.id == id)
    }
  },
  Mutation: {
    createBook: (parent, args) => {
      books = [...books, args]

      return args
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
