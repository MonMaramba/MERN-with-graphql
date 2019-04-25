const graphql = require('graphql');
const _ = require('lodash');



// Grabbing properties from the graphql package by destructuring
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Dummy data
const books = [
    { name: 'I Hope They Serve Beer in Hell', genre: 'Comedy', id: '1'}, 
    { name: 'Hunt for Red October', genre: 'Fiction', id: '2'},
    { name: 'Cracking the Coding Interview', genre: 'Technical', id: '3'},
]

// Defining the first object type with fields as a function
const BookType = new GraphQLObjectType({  // function that takes   
    name: 'Book',                           // in an object 
    fields: () => ({
        id: { type: GraphQLString }, 
        name: { type: GraphQLString }, 
        genre: { type: GraphQLString }
    })
});

// Establishing how to jump into the graph(db)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {   // gives options on how to get into the graph(db)
        book: { // to grab book....
            type: BookType, //
            args: { id: { type: GraphQLString }}, // expected param
            resolve(parent, args){  
                //code to get data from db / other source
                return _.find(books, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery  //defines which query users are allowed from                      front end
    
});