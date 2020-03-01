var mongoose = require('mongoose');
var toDoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

var toDoModel = mongoose.model('ToDO', toDoSchema);

module.exports = toDoModel;