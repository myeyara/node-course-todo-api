//const MongoClient = require('mongodb').MongoClient;
//ObjectID = constructor for generating ObjectIds for any purpose
//destructured:
const {MongoClient, ObjectID}= require('mongodb');

var obj = new ObjectID();
console.log(obj);

//Datenbank TodoApp wird automatisch verbunden - auch wenn sie noch nicht existiert
//mit dem anlegen eines Dokuments wird die DB dann auch erstellt
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log ('Unable to connect to mongodb-server');
    //mit return+funktion wird verhindert, dass der folgende Code ausgeführt wird
  }
  console.log('connected to mongodb-server');
  //toArray = promise
  db.collection('Todos').find({completed: true}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    if(err) {
      throw error(err);
    }
  });

  db.collection('Todos').find({_id: new ObjectID('593d5def8b34f923417da179')}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    if(err) {
      throw error(err);
    }
  });

  db.collection('Todos').find().count().then((count) => {
    console.log('Anzahl: ',count);
  }, (err) => {
    if(err) {
      throw error(err);
    }
  });

  db.collection('User').find({name: 'Kai-Stefan'}).toArray().then((doc) => {
    console.log('User mit Kai-Stefan: ',JSON.stringify(doc, undefined, 3));
  }, (err) => {
    if(err) {
      throw error(err);
    }
  });
  //db.close();
});
