//Server's main file
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const Schema = require('./schema/schema');
const rootResolver = require('./resolver/rootResolver');

// Create an express server and GraphQL endpoint
const app = express();
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: rootResolver,
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0-oomgm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
.then(() => {
    app.listen(8080, () => {
        console.log('\n========== Express GraphQL Server Now Running On localhost:8080/graphql ==========\n');  
    })
})
.catch(err => {
    console.log('=====> MONGO CONNECTION ERROR:\n', err);
})
