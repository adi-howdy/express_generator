const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../model/dishes');

//to supprt express router
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
//mounting router to index.js
dishRouter.route('/')
.get((req,res,next) => {
   Dishes.find({})
   .then((dishes) => {
       res.sendStatus =200;
       res.setHeader('Content-Type', 'application/json');
       res.json(dishes); // it is send to client via body of response
   }, (err) =>next(err)
   ).catch((err) => next(err));
})
.post((req,res,next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish created', dish);
        res.sendStatus =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('put not supported'); 
})
.delete((req,res,next) => {
    Dishes.remove({})
    .then((resp) => {
        console.log('Dish removed', resp);
        res.sendStatus =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId')
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dishes) => {
        res.sendStatus =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes); // it is send to client via body of response
    }, (err) =>next(err)
    ).catch((err) => next(err));
 })
 .post((req, res, next) => {
     console.log('not permitted');
     res.sendStatus = 403;
     res.end('not supported', req.params.dishId);
 })
 .put((req, res, next) => {
     Dishes.findByIdAndUpdate(req.params.dishId, {
         $set:req.body
     }, {new: true})
     .then((dishes) => {
        res.sendStatus =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes); // it is send to client via body of response
    }, (err) =>next(err)
    ).catch((err) => next(err));  
     })
 .delete((req, res, next) => {
     Dishes.findByIdAndRemove(req.params.dishId)
     .then((response) => {
            console.log('Dish removed', response);
            res.sendStatus =200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        },(err) => next(err))
        .catch((err) => next(err));
    }); 
    


module.exports = dishRouter;
