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
    


dishRouter.route('/:dishId/comments')
.get((req,res,next) => {
   Dishes.findById(req.params.dishId)
   .then((dishes) => {
       if(dishes != null ){
       res.sendStatus =200;
       res.setHeader('Content-Type', 'application/json');
       res.json(dishes.comments); // it is send to client via body of response
       }
       else {
           console.log('disheeess id is nit found');
           err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) =>next(err)
   ).catch((err) => next(err));
})
.post((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dishes != null ){
             dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.sendStatus =200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes.comments); // it is send to client via body of response
            })        
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                 err.status = 404;
                 return next(err);
             }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('put not supported'); 
})
.delete((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null ){
           for (var i = dish.comments.length-1; i >=0; i--) {
               dish.comments.id(dish.comments[i]._id).remove();
            }
               dish.save()
               .then((dish) => {
                   res.sendStatus =200;
                   res.setHeader('Content-Type', 'application/json');
                   res.json(dish); // it is send to client via body of response
               }, (err) => next(err)); 
           
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                 err.status = 404;
                 return next(err);
             }

    },(err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId/comments/:commentsId')
.get((req, res, next) => {
    console.log('check');
    Dishes.findById(req.params.dishId)
    .then((dishes) => {
        console.log('coments id: ', req.params.dishId);
        if(dishes != null && dishes.comments.id(req.params.commentsId) != null){
        console.log('reached inside comments');
            res.sendStatus =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes.comments.id(req.params.commentsId)); // it is send to client via body of response
        }
        else if (dishes == null){
            console.log('disheeess id is nit found');
            err = new Error('Dish ' + req.params.dishId + ' not found');
             err.status = 404;
             return next(err);
         }
         else {
            console.log('commentsid  id is nit found');
            err = new Error('Dish ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
         }
     }, (err) =>next(err)
    ).catch((err) => next(err));
 })
 .post((req, res, next) => {
     console.log('not permitted');
     res.sendStatus = 403;
     res.end('not supported', req.params.dishId);
 })
 .put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
    

        if(dish != null && dish.comments.id(req.params.commentsId) != null){
            console.log('new id2 ::: ', req.params.dishId);
            if(req.body.rating){
                dish.comments.id(req.params.commentsId).rating = req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentsId).comment = req.body.comment;
            }
            dish.save()
               .then((dish) => {
                   res.sendStatus =200;
                   res.setHeader('Content-Type', 'application/json');
                   res.json(dish); // it is send to client via body of response
               }, (err) => next(err)); 
        }
        else if (dish == null){
            console.log('disheeess id is nit found');
            err = new Error('Dish ' + req.params.dishId + ' not found');
             err.status = 404;
             return next(err);
         }
         else {
            err = new Error('Dish ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
         }
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
