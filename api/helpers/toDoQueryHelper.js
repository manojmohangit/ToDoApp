var mongoDb = require('../models/index');

exports.getToDoTask = function(req, res) {
    mongoDb.toDoModel.find().sort([ ['creationDate', "desc"]])
    .then(function(todos) {
        res.send(todos);
    })
    .catch(function(err) {
        res.send(err);
    })
}

exports.createToDo = function(req, res) {
    mongoDb.toDoModel.create(req.body)
    .then(function(todo) {
        res.status(201).send(todo)
    })
    .catch(function(err) {
        res.send(err);
    })
}

exports.deleteToDo = function(req, res) {
    mongoDb.toDoModel.remove({_id: req.params.toDoId})
    .then((message) => {
        res.send({ message: "Deleted"})
    })
    .catch((err) => {
        res.send(err)
    });
};

exports.updateToDo = function(req, res) {
    mongoDb.toDoModel.findByIdAndUpdate({_id : req.params.toDoId}, req.body, {new: true})
    .then(function(todo){
        res.send(todo);
    })
    .catch(function(err) {
        
        res.send(err);
    })
};

exports.getToDoById = function(req, res) {
    mongoDb.toDoModel.findById(req.params.toDoId)
    .then(function(todo) {
        res.send(todo)
    })
    .catch(function(err) {
        res.send(err);
    })
};


module.exports = exports;