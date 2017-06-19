//mocha and nodemon do not need to be required
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//Datenbank sollte von Todos geleert sein und einen festen Satz von Testdaten haben
//beforeEach läuft vor jedem Test-Fall und leert hier die Datenbank
//gesteuert über done
var toDos = [
  {text: 'Test Todo 1', completed: true},
  {text: 'Test Todo 2', completed: false},
  {text: 'Test Todo 3', completed: true},
  {text: 'Test Todo 4', completed: false},
];

var anzahl = 0;

beforeEach((done) => {
  Todo.remove({}) // leeres Objekt => alle Todos werden gelöscht
  .then(() => {
    return Todo.insertMany(toDos);
  })
  .then(() => done());
});


describe('POST /todos', () => {
  it('should create a new to do', (done) => {
    var text = 'Test Todo 5';
    request(app)
      .post('/todos')
      .send({text}) // supertest wandelt Objekt automatisch in JSON um
      .expect(200) // status 200 -> all worked fine
      .expect((res) => { //that is what comes back from the server
        expect(res.body.text).toBe(text) // Textinhalt muss der Variable entsprechen
      })
      .end((err, res) =>{
        if (err) {
          return done(err); // return: stoppt Ausführung; done: stoppt expect und gibt err aus
        }
        Todo.find({text: text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
          // achtung: gegenwärtig wird in server.js kein insert durchgeführt; darum auch kein weiteres Document
        })
        .catch((e) => done(e));
      })
  });

  it('should be 4 docs', (done) => {
    Todo
      .find()
      .count()
      .then((count) => {
          anzahl = count;
          expect(count).toBe(anzahl);
          done();
        })
        .catch((e) => done(e));
  });


  it('should not create todo with invalid text data', (done) => {
    var anzahl = 0;
    Todo
      .find()
      .count()
      .then((count) => {
          anzahl = count;
        })
        .catch((e) => done(e));
    request(app)
      .post('/todos')
      .send({})
      .expect(400) // Bad request
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(anzahl);
          done();
        })
        .catch((e) => done(e))
      })
  });
});

describe('GET /todos', () => {
  it('should GET all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().count().then((count) => {
          expect(count).toBe(anzahl);
          done();
        })
      .catch((e) => done(e))
      })
  });
});
