//GraphQL Root Resolver: contains todo resolver and user resolver
const todoResolver = require('./todos');
//need to add user

module.exports = {
    ...todoResolver
};

