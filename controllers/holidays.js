const express = require('express');
const HOLIDAYS = express.Router();
const Holiday = require('../models/holidays');


/*
INDEX
curl 'http://localhost:3003/holidays'
*/
HOLIDAYS.get('/', (req, res) => {
    Holiday.find({}, (err, foundHolidays) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        res.status(200).json(foundHolidays);
    });
});

/*
CREATE
curl -X POST -H "Content-Type: application/json" -d '{"name":"world kindness"}' 'http://localhost:3003/holidays'
curl -X POST -H "Content-Type: application/json" -d '{"name":"zipper"}' 'http://localhost:3003/holidays'
*/
HOLIDAYS.post('/', (req, res) => {
    Holiday.create(req.body, (err, createdHoliday) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        // since our server.js has 'express.json()' we know this will be formatted
        // correctly.
        res.status(200).send(createdHoliday);
    });
});


/*
UPDATE
curl -X PUT -H "Content-Type: application/json" -d '{"name":"I updated this"}' 'http://localhost:3003/holidays/604a411d3995539db15869f2'
*/
HOLIDAYS.put('/:id', (req, res) => {
    Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedHoliday) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        res.status(200).json(updatedHoliday);
    })
});


/*
DELETE
curl -X DELETE 'http://localhost:3003/holidays/604a3ffb3995539db15869f1'
*/
HOLIDAYS.delete('/:id', (req, res) => {
    Holiday.findByIdAndRemove(req.params.id, (err, deletedHoliday) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        res.status(200).json(deletedHoliday);
    });
});


module.exports = HOLIDAYS;
