const express = require('express');
const bodyParser = require('body-parser');

//to supprt express router
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
//mounting router to index.js
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // it will look for additional information
            // which will match for ./dishes ie to get and post
            // give below
})
.get((req,res,next) => {
    res.end('sedndishes to you'); 
})
.post((req,res,next) => {
    res.end( 'will add dish ' + req.body.name + ' with details ' + req.body.description); 
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('put not supported'); 
})
.delete((req,res,next) => {
    res.end( 'Deleting all the dishes'); 
});

module.exports = dishRouter;
