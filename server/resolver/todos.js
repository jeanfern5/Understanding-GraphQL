//GraphQL Todo Resolver
const Todo = require('../models/todo');

module.exports = 
{
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
}