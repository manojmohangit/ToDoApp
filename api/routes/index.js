var express = require('express');
var router = express.Router();
var toDoHelper = require('../helpers/toDoQueryHelper');


router.route('/')
    .get(toDoHelper.getToDoTask)
    .post(toDoHelper.createToDo);

router.route('/:toDoId')
    .get(toDoHelper.getToDoById)
    .put(toDoHelper.updateToDo)
    .delete(toDoHelper.deleteToDo);

module.exports = router;