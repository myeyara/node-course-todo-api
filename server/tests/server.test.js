//mocha and nodemon do not need to be required
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//Datenbank soote von Todos geleert sein
//beforeEach läuft vor jedem Test-Fall und leert hier die Datenbank
//gesteuert über done
beforeEach((done) => {
  Todo.remove({}) // leeres Objekt => alle Todos werden gelöscht
  .then(() => done());
});


describe('POST /todos', () => {
  it('should create a new to do', (done) => {
    var text = 'test todo text';
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
        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        })
        .catch((e) => done(e));
      })
  });

  it('should not create todo with invalid text data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400) // Bad request
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        })
        .catch((e) => done(e))
      })
  });

});
