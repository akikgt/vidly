const moment = require('moment');
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });

    if (!rental) return res.status(404).send('Rental not found');

    if (rental.dateReturned) return res.status(400).send('Return is already processed');

    rental.dateReturned = new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days'); 
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
    await rental.save();

    await Movie.update({ _id: rental.movie._id}, {
        $inc: { numberInStock: 1 }
    });

    res.status(200).send(rental);
});

module.exports = router;

