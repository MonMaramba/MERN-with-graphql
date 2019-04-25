const express = require('express');
const graphqlHTTP = require('express-graphql'); // naming                                                           convention
const schema = require('./schema/schema');
const app = express();

app.use('/graphql', graphqlHTTP({
    schema
}));

app.listen(4000, () => {
    console.log(`Port 4000 is now listening for requests`)
});