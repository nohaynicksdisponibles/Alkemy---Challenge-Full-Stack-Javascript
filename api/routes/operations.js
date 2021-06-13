const server = require('express').Router();
const jwt = require('jsonwebtoken');
const {User} = require("../models/index")
const middleWareJsonToken = require("../utils/jwt")
//const token = jwt.sign({ foo: 'bar' }, process.env.KEY, {expiresIn: '30 days'});

/*
var decoded = jwt.verify(token, process.env.KEY);

jwt.verify(token, 'shhhhh', function(err, decoded) {
  console.log(decoded.foo) // bar
});

*/

server.use(middleWareJsonToken)

server.post('/create',function (req,res){

})

server.get('/operaciones',function(req,res){
    
})

server.get('/ingresos',function(req,res){
    
})

server.get('/egresos',function(req,res){
    
})

module.exports = server;