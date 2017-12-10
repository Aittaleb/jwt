const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const Todo = require('../../models/todo');
const User = require('../../models/user');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'userOne@gmail.com',
    password: 'userOnePassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, '132abc').toString()
    }]
},
{
    _id: userTwoId,
    email: 'userTwo@gmail.com',
    password: 'userTwoPassword'
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator : userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    _creator : userTwoId,
    completed: true,
    completedAt: 333
}];
var populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

var populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);

    }).then(() => done());
};

module.exports = {
    populateTodos,
    todos,
    users,
    populateUsers
}