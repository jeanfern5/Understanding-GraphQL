const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
// const Schema = require('./schema');

//Sample Data
const todos = []
//     {
//         _id: 1,
//         title: 'Title 1',
//         description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
//         date: '4/1/2019',
//     },
//     {
//         _id: 2,
//         title: 'Title 1',
//         description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
//         date: '4/2/2019',
//     },
//     {
//         _id: 3,
//         title: 'Title 3',
//         description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
//         date: '4/3/2019',
//     }
// ]

// let getTodo = function(args) {
//     let id = args.id;
//     return todosData.filter(todo => {
//         return todo.id == id;
//     })[0];
// }

// let getTodos = function(args) {
//     if (args.title){
//         let title = args.title;
//         return todosData.filter(todo => todo.title == title);
//     } else {
//         return todosData;
//     }
// }

// let editTodo = function({id, title}){
//     todosData.map(todo => {
//         if (todo.id === id) {
//             todo.title = title;
//             return todo;
//         }
//     })
//     return todosData.filter(todo => todo.id === id)[0];
// }

// //Root Resolver
// let root = {
//     todo: getTodo, 
//     todos: getTodos,
//     editTodo: editTodo
// };


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
            return todos;
        },
        addTodo: (args) => {
            const todo = {
                _id: Math.random().toString(),
                title: args.todoInput.title,
                date: args.todoInput.date,
                description: args.todoInput.description
            }
            todos.push(todo);
            return todo;
        }
    },
    graphiql: true
}))

app.listen(8080, () => {
    console.log('\n========== Express GraphQL Server Now Running On localhost:8080/graphql ==========\n');  
})
