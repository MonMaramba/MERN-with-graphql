const express = require('express');
const graphqlHTTP = require('express-graphql');  
const schema = require('./schema/schema');     
const app = express();
const mongoose = require('mongoose');

// connect to mlab database
mongoose.connect('mongodb://Ramon:test123@ds149059.mlab.com:49059/graphql-mern', { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
    console.log('connected to the database');
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // graphiql tool on port
}));

app.listen(4000, () => {
    console.log(`Port 4000 is now listening for requests`)
});