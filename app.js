var express = require('express');
var bodyParser = require('body-parser');
var lodash = require('lodash');
var mongojs = require('mongojs');

var app = express();

var dataBase = mongojs('matapp1', ['invoices']);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


dataBase.on('error', function(err) {
  console.log('database error', err);

  var invoices = [{
    numero: '*****',
    fecha: 'blank',
    precio: 'blank',
    descripcion: 'error en la base'
  }];

});

dataBase.on('connect', function() {
  console.log('connected to DB');
});


app.get('/', function(req, res) {
  res.send('Estas donde estas: home');

  var confirmation = confirm('Queres ir al listado de invoices?');

  if (confirmation) {
    res.redirect('/invoices');
  }
});

// POST /login gets urlencoded bodies
app.get('/invoices', function(req, res) {

  dataBase.invoices.find(function(err, invoices) {
    /* Si tuviera que iterar y mostrar 1 a 1
      lodash.foreach(invoices, function(){
      res.json(invoice);
    }); */
    // invoices is an array of invoices from mongoDB collection
    res.json(invoices);
  });
});

app.post('/invoices/new/:numero/:fecha/:precio/:descripcion', function(req, res) {

  res.send('Invoice: ' + req.params.numero + 'creada');
  console.log('se crea la invoice: ' + req.params.numero);

  var newInvoice = {
    numero: req.params.numero,
    fecha: req.params.fecha,
    precio: req.params.precio,
    descripcion: req.params.descripcion
  };

  dataBase.invoices.insert(newInvoice, function(err, result) {

    if (err) {
      console.log(err + ' al querer guardar la invoice ' + newInvoice.numero);
      alert('ERROR: ' + newInvoice.numero + ' no fue almacenada');
    } else {
      res.redirect('/invoices');
      alert('La invoice ' + newInvoice.numero + ' fue almacenada');
    }

  });
});

app.put('/invoice/edit/:numero', function(req, res) {

  res.send('peticion de PUT: ' + req.params.numero);
  console.log('peticion de PUT, ' + req.params.numero);
});

app.delete('/invoice/delete/:numero', function(req, res) {

  res.send('peticion de DELETE de: ' + req.params.numero);
  console.log('se intenta borrar el registro: ' + req.params.numero);
});

// GET al /status
app.get('/status', function(req, res) {

  res.send('GET al /status');
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});
