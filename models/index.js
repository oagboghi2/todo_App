var mongoose = require('mongoose');
//set debug mode to true  so we can see when things fail, if they fail
mongoose.set('debug', true);
//connect to database server on the localhost. Whatever you want to call your database is defined and created here
mongoose.connect('mongodb://localHost/todo-api')

//allows us to use promise syntax
mongoose.Promise = Promise;

module.exports.Todo= require("./todos");
