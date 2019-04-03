const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Todo = require('./models/todo');

// Create an express server and GraphQL endpoint
const app = express();
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Todo {
            _id: ID!
            title: String!
            date: String!
            description: String!
        }
        input TodoInput {
            title: String!
            date: String!
            description: String!
        }
        type RootQuery {
            todos: [Todo!]!
        }
        type RootMutation {
            addTodo(todoInput: TodoInput): Todo
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        todos: () => {
            return Todo
            .find()
            .then(todos => {
                return todos.map(todo => {
                    return { ...todo._doc, _id: todo.id }; //.id comes from mongoose
                })
            })
            .catch(err => {
                console.log('-----> todos Error:\n', err);
                throw err;
            });
        },
        addTodo: (args) => {
            const todo =   new Todo ({
                title: args.todoInput.title,
                date: args.todoInput.date,
                description: args.todoInput.description            
            })

            return todo
            .save()
            .then(result => {
                console.log(result);
                return { ...result._doc, _id: result.id }; //.id comes from mongoose
            })
            .catch(err => {
                console.log('----> addTodo Error:\n', err);
                throw err;
            });
        }
    },
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
