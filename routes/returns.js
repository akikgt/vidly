const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let rental = Rental.find({
        customerId: req.body.customerId,
        movieId: req.body.movieId
    });

    if (!rental) return res.status(404).send('No rental found');

    res.send(200);
});

module.exports = router;