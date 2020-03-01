var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOLINK, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

module.exports.toDoModel = require('./toDo');
