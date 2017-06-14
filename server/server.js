var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
//gibt json-Daten als Objekt weiter
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.status(200).send(doc);
    console.log('new todo saved:',JSON.stringify(doc));
  }, (e) => {
    res.status(400).send(e);
    console.log('unable to save todo',e);
  })
});

app.listen(3000, () => {
  console.log('Server up and runing - listen to port 3000');
})

//damit sich die Anwendung zum Testen imortieren lässt
module.exports = {app};
