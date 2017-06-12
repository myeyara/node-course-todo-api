const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if (err) {
    return console.log('unable to connect to mongodb: ', err);
  }

  // db.collection('Todos')
  //   .findOneAndUpdate(
  //       { _id: new ObjectID('593e2da88b34f923417da17a') },
  //       { $set: {completed: true } },
  //       { returnOriginal: false }
  //     )
  //   .then((res) => {
  //     console.log(res);
  //   });

  db.collection('User')
  .findOneAndUpdate(
    { _id: new ObjectID ('593d6acb877f11020d012ec7') },
    { $set: { name: 'Kai-Stefan' },
      $inc: { age: 1 }
    },
    { returnOriginal: false}

  )
  .then((res) => {
    console.log(res);
  });
  //db.close();
});
