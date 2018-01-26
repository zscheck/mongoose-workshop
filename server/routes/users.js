const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET	/api/users/ Retrieve all users 
router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(console.error);
});

//GET /api/users/:id Retrieve User ID Information
router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            if (!user) res.status(404).send(null);
            res.status(200).json(user);
            console.log(user);
        })
        .catch(console.error);
})

//POST /api/users Create a new user
router.post('/', (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then(user => {
            res.status(201).json(user);
        })
        .catch(console.error);
});

//PUT /api/users/:id Update a user
router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true })
        .then(user => {
            res.status(204).send(req.body);
        })
        .catch(console.error);
});

//DELETE /api/users/:id Delete a user
router
    .delete('/:id', (req, res) => {
        User.findByIdAndRemove(req.params.id)
            .then(user => {
                res.send(req.params.id);
            })
            .catch(console.error);
    });

module.exports = router;