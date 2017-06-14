var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1, //verhindert das Speichern leerer Strings
    trim: true, //löscht Leerzeichen am Anfang und Ende
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number, //Unix timestamp is a number
    default: null, //leer
  }
});

module.exports = {Todo};

//Beispiel
// var newTodo = new Todo({
//   text: 'prepare dinner'
// });
//
// newTodo.save().then(
//   (doc) => {
//     console.log('saved todo:',doc);
//   },
//   (e) => {
//     console.log('unable to save todo');
//   });

// var newTodo = new Todo({
//   text: 'iron shirts'
// });
//
// newTodo.save().then(
//   (doc) => {
//     console.log('saved todo',doc);
//   },
//   (e) => {
//     console.log('unable to save todo',e);
//   }
// );
