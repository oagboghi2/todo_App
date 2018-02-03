var express = require('express');
var router = express.Router();
var db = require('../models')

router.get('/', function(req,res){
  db.Todo.find()
    .then(function(todos){
      res.json(todos);
    })
    .catch(function(err){
      res.send(err)
    })
});

router.post('/', (req, res)=>{
  //req.body.name = "John";
  db.Todo.create(req.body)
    .then(function(newTodo){
      res.status(201).json(newTodo)
    })
    .catch(function(err){
      res.send(err);
    });
});

router.get('/:todoId', (req, res)=>{
  db.Todo.findBy(req.params.todoId)
    .then(function(foundTodo){
      res.json(foundTodo)
    })
    .catch(function(err){
      res.send(err)
    })
})

router.put('/:todoId', (req, res)=>{
  //req.params.todoId = "5a74ba36b03cb5a6ef3c64bd"
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body)
    .then(function(todo){
      res.json(todo)
    })
    .catch(function(err){
      res.send(err);
    })
})

router.delete('/:todoId', (req, res)=>{
  db.Todo.remove({_id: req.params.todoId})
    .then(function(){
      res.json({message: "We deleted it"});
    })
    .catch(function(err){
      res.send(err)
    })
})

module.exports = router
