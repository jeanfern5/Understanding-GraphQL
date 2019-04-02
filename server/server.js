const express = require('express');
const graphqlHTTP = require('express-graphql');
var graphql = require ('graphql').graphql; 
const Schema = require('./schema');

let query = 'query { todos {id, title, date, description} }'
graphql(Schema, query).then( function(result) {  
    // console.log(JSON.stringify(result,null," "));
});


// Create an express server and GraphQL endpoint
const app = express();
app.use('/', graphqlHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}))

app.listen(8080, () => {
    console.log('\n========== Express GraphQL Server Now Running On localhost:8080/graphql ==========\n');  
})
