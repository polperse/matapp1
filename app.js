var express = require('express');
var bodyParser = require ('body-parser');
var lodash = require ('lodash');
var dataBase = require ('mongojs');

var app = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


db.on('error', function(err) {
  console.log('database error', err);

  var invoices = [{
    numero: '*****',
    fecha: 'blank',
    precio: 'blank',
    descripcion: 'error en la base'
  }];
});

db.on('connect', function() {
  console.log('connected to DB');
});


app.get('/', function(req, res){
  res.send('Estas donde estas: home');
});

// POST /login gets urlencoded bodies
app.get('/invoices', function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  } else {
      /* Si tuviera que iterar y mostrar 1 a 1
        lodash.foreach(invoices, function(){
        res.json(invoice);
      }); */
      res.json(invoices);
  }
});

app.post('/invoice/new', function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  } else {
    res.send('Invoice: ' + req.params.id + 'creada');
    console.log('se crea la invoice: ' + req.params.id);
  }
});

app.put('/invoice/edit/:id', function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  } else {
      res.send('peticion de PUT: ' + req.params.id);
      console.log('peticion de PUT, ' + req.params.id);
  }
});

app.delete('/invoice/delete/:id', function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  } else {
    res.send('peticion de DELETE de: ' + req.params.id);
    console.log('se intenta borrar el registro: ' + req.params.id);
  }
});

// GET al /status
app.get('/status', function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  } else {
      res.send('GET al /status');
  }
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});
