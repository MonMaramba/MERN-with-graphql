const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');


// Grabbing properties from the graphql package by destructuring
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,  // flexible. Can be a string or integer
    GraphQLInt,
    GraphQLList, // multiple
    GraphQLNonNull
} = graphql;

/*// Dummy data
const books = [
    { name: 'I Hope They Serve Beer in Hell', genre: 'Comedy', id: '1', authorId: '1' }, //authorId is === id in authors 
    { name: 'Hunt for Red October', genre: 'Fiction', id: '2', authorId: '2' },
    { name: 'Cracking the Coding Interview', genre: 'Technical', id: '3', authorId: '3' }, 
    { name: 'Shadow Warriors', genre: 'Documentary', id: '4', authorId: '2' },
    { name: 'Assholes Finish First', genre: 'Comedy', id: '5', authorId: '1' },
    { name: 'Rainbow Six', genre: 'Fiction', id: '6', authorId: '2' }
];

const authors = [
    { name: 'Tucker Max', age: 43, id: '1' },
    { name: 'Tom Clancy', age: 66, id: '2' },
    { name: 'Gayle Laakmann McDowell', age: 36, id: '3'}
];*/

// Defining the first object type with fields as a function
const BookType = new GraphQLObjectType({  // function that takes   
    name: 'Book',                           // in an object 
    fields: () => ({
        id: { type: GraphQLID }, 
        name: { type: GraphQLString }, 
        genre: { type: GraphQLString },
        author: {
            type: AuthorType, //already defined
            resolve(parent, args){
                //return _.find(authors,{ id: parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({  // function that takes   
    name: 'Author',                           // in an object 
    fields: () => ({
        id: { type: GraphQLID }, 
        name: { type: GraphQLString }, 
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, { authorId: parent.id })
                return Book.find({authorId: parent.id});
            }
        }
    })
});

// Establishing how to jump into the graph(db)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {   // gives options on how to get into the graph(db)
        book: { // to grab book....
            type: BookType, //
            args: { id: { type: GraphQLID }}, // expected param
            resolve(parent, args){  
                //code to get data from db / other source
                //return _.find(books, { id: args.id });
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
               // return _.find(authors, { id: args.id });+
               return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return books;
                return Book.find({})  // empty params returns all
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors;
                return Author.find({});
            }
        }
    }
});
// Mutations allows data change(adding, editing, deleting)
// must be explicit in GraphQL 
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({ // Author is imported
                    name: args.name,        // model
                    age: args.age
                });
                return author.save(); // mongoose 
            }

        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                genre: { type: new GraphQLNonNull(GraphQLString)},
                authorId: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,  //defines which query users are allowed from
    mutation: Mutation  // front end
    
});