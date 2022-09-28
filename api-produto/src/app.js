//criação da aplicação

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://usuario:senha@cluster0.o5j1hyu.mongodb.net/estoque_produto');
app.use(express.json());

app.use(express.urlencoded({extended: true}));

//segurança
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    next();
});

//registrar a model
require('./models/product');
require('./models/category');



//registrar rota
const productRouter = require('./routes/product-route');
const categoryRouter = require('./routes/category-route');

const index = require('./routes/index');

app.use('/', index);
app.use('/products', productRouter)
app.use('/categories', categoryRouter)

module.exports = app;