let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let UserToStore = require('../models/userToBeStored');

module.exports.displayBookList = (req, res, next) => {
    UserToStore.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('userToStore/list', 
            {title: 'Users', 
            BookList: bookList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('userToStore/add', {title: 'Add new user', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBook = UserToStore({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
        "birth": req.body.birth,
        "password": req.body.password
    });

    UserToStore.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/user-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    UserToStore.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('userToStore/edit', {title: 'Edit User', book: bookToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBook = UserToStore({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
        "birth": req.body.birth,
        "password": req.body.password
    });

    UserToStore.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/user-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    UserToStore.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             res.redirect('/book-list');
        }
    });
}