const express = require('express');
const graphqlHTTP = require('express-graphql');  
const schema = require('./schema/schema');     
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // graphiql tool on port
}));

app.listen(4000, () => {
    console.log(`Port 4000 is now listening for requests`)
});