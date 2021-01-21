const { ApolloServer, gql , UserInputError, AuthenticationError} = require('apollo-server')
require('dotenv').config()
const { v1: uuid } = require("uuid");
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'



MONGODB_URI = 'mongodb+srv://jarryingnut:hesoyam10@fullstackopen.h8g22.mongodb.net/graphql?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})


// Author.insertMany(authors)
// Book.insertMany(books)

const typeDefs = gql`
  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
  }

  type Token {
  value: String!
  }

  
   type Author {
       name: String!,
       bookCount: Int
       born: Int
      
   }

  type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

  type Query {
      me: User
      bookCount: Int!,
      authorCount: Int!,
      allAuthors: [Author]!,
      allBooks(author: String, genre: String): [Book]!,
  }

  type Mutation {
      editAuthor(name: String!, setBornTo: Int!): Author

      createUser(
      username: String!
      favoriteGenre: String!
      ): User

      login(
      username: String!
      password: String!
      ): Token

      addBook(
        title: String!,
        published: Int!,
        author: String!,
        genres: [String]!
      ): Book
  }
`

const resolvers = {

  

  Book: {
    author: async (root) => {
      const id = root.author
      const bookCount = await Book.find({ author: { $in : id}})
      .populate("author")
      .countDocuments();

    const author = await Author.findById(id);
    if(!author) return
    return {
      name: author.name,
      bookCount: bookCount,
      born: author.born,
      }
    },
  },

  


  Query: {
    me: (root, args, context) => {
      console.log({context})
      return context.currentUser
    },

    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({});

      let booksPerAuthor = authors.map(async (author) => {
        const result = await Book.find({
          author: { $in: author._id },
        }).populate("author");

        const authorObject = {
          name: author.name,
          born: author.born,
          bookCount: result.length,
        };
        return authorObject;
      });

      //booksPerAuthor = await Promise.all(booksPerAuthor);

      return booksPerAuthor;
    },

    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
         const books = await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate("author");

        return books;
      }
      if(args.genre){
        return Book.find({genres: {$in: [args.genre]}})
      } else if (args.author) {
        const author = await Author.findOne({name: args.author})
        return Book.find({author: author._id})
      } else {
        return Book.find({})
      }
    },
    
  },

  Mutation: {

    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (!user || args.password !=='secred') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    },
    
    addBook: async (root, args, context) => {
      let book;
    try{
      const author = await Author.findOne({name: args.author})
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      if(author){
         book = new Book({...args, author: author._id})
          book.save()
      }
     if(!author){
      const author = new Author({name: args.author, born: null, bookCount: 1,})
      await author.save()
      book = new Book({ ...args, author: author._id });
      await book.save()
      // await auth.books.concat(book.id)
     }
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
      return book
    },

    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({name: args.name})
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let updated

      if (!author) return null;
      try {
        updated = await Author.findByIdAndUpdate(author._id, {born: args.setBornTo}, {new: true})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
     // author.born = args.setBornTo
     // await author.save()
      return updated
    },

  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})