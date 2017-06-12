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
  //erstellen einer "Tabelle"/Collection einfach durch benennen
  //insertOne:  fügt ein Dokument in die Collection ein
  //            ({Objekt}, callback)
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false,
  // }, (err, result) => {
  //   if (err){
  //     return console.log ('Unable to insert Todo', err);
  //   }
  //   console.log('inserted Todo: ', JSON.stringify(result.ops, undefined,2));
  // });



  db.collection('User').insertOne({
    name: 'Simon',
    age: 49,
    location: 'Berlin, Germany',
  }, (err, result) => {
    if (err) {
      return console.log('unable to instert User', err);
    }
    console.log('Inserted User: ', JSON.stringify(result.ops, undefined,2));
  });

  //schließt die Verbindung zum Server
  db.close();
});

//Object destruction: ersellt Variable mit den Namen des Properties eines Objekts
// var user = {name: 'Sam', age: 44};
// var {age} = user;
// console.log(age);
