//
//Creating a variety of todos to play with
//

const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to database: ', err);
  }
  //Array of ToDos to create
 toDos = [
   {text: 'water plants', completed: true},
   {text: 'make bed', completed: false},
   {text: 'walk the dog', completed: true},
   {text: 'prepair meal', completed: false},
 ];
 for (toDo of toDos) {
   db.collection('Todos').insertOne(toDo, (err,res) => {
     if (err) {
       throw console.error('unable to add todo',err);
     }
     console.log('Inserted: ', JSON.stringify(res.ops, undefined, 3));
   });
 };
 db.collection('Todos').find().count().then((count) => {
   console.log('sind nun', count, 'Todos');
 })

 //db.close();
});
