//GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Query {
        todo(id: Int!): Todo
        todos(title: String): [Todo]
    }
    type Todo {
        _id: ID!
        title: String!
        date: String!
        description: String

    }
    type Mutation {
        editTodo(id: Int!, title: String!): Todo
    }
  
`);

let getTodo = function(args) {
    let id = args.id;
    return todosData.filter(todo => {
        return todo.id == id;
    })[0];
}

let getTodos = function(args) {
    if (args.title){
        let title = args.title;
        return todosData.filter(todo => todo.title == title);
    } else {
        return todosData;
    }
}

let editTodo = function({id, title}){
    todosData.map(todo => {
        if (todo.id === id) {
            todo.title = title;
            return todo;
        }
    })
    return todosData.filter(todo => todo.id === id)[0];
}