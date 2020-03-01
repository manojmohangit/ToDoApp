var express = require('express');
var router = express.Router();
var helper = require('../helpers/toDoQueryHelper');


router.route('/')
    .get(helper.getToDoTask)
    .post(helper.createToDo);

router.route('/:toDoId')
    .get(helper.getToDoById)
    .put(helper.updateToDo)
    .delete(helper.deleteToDo);

module.exports = router;