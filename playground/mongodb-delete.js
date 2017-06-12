const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Cannot connect to TodoApp', err);
  }
  // deleteMany: delete all that match the criteria
  // db.collection('Todos').deleteMany({text: 'repair vacuum cleaner'}).then((res) => {
  //   console.log(res);
  // });

  // deleteOne: delete the first document to match the criteria
  // db.collection('Todos')
  // .deleteOne({text: 'water plants'})
  // .then((res) => {
  //   console.log(res);
  // });
  // findOneAndDelete: finds the first to meet the criteria and deletes it as
  // well as giving back the deleted object
  // db.collection('Todos')
  //   .findOneAndDelete({_id: new ObjectID('593e344c4c5e2e224b7fd6c3')})
  //   .then((res) => {
  //     console.log('Just deleted:',JSON.stringify(res.value, undefined, 3));
  //   });

  // Challange:
  // 1. Delete Users with name Kai-Stefan
  // db.collection('User')
  //   .deleteMany({name: 'Kai-Stefan'})
  //   .then((res) => {
  //     console.log('All deleted: ', res);
  //   })
  // //db.close();
  //2. Delete User with specific ID
  db.collection('User')
    .findOneAndDelete({_id: new ObjectID('593d6b61ecd8fe02d1867e3f')})
    .then((res) => {
      console.log('Gelöscht wurde:', res.value);
    });
});
