const graphql = require('graphql');

//Sample Data
var todosData = [
    {
        id: 1,
        title: 'Title 1',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        date: '4/1/2019',
    },
    {
        id: 2,
        title: 'Title 1',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        date: '4/2/2019',
    },
    {
        id: 3,
        title: 'Title 3',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        date: '4/3/2019',
    }
]

let TodoType = new graphql.GraphQLObjectType({
    name: 'todo',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLID
            },
            title: {
                type: graphql.GraphQLString
            },
            date: {
                type: graphql.GraphQLString
            },
            description: {
                type: graphql.GraphQLString
            }
        }
    }
})

let queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            todos: {
                type: new graphql.GraphQLList(TodoType),
                resolve: function() {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function() {
                            resolve(todosData)
                        }, 1000)
                    })
                }
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: queryType
})