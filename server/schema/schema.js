//GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
`)

