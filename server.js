const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const holidaysController = require('./controllers/holidays');

const APP = express();
const PORT = 3003;
const DBNAME = 'holidays';


mongoose.connect(`mongodb://localhost:27017/${DBNAME}`, { useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongoose...');
});

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

APP.use(cors(corsOptions));

APP.use(express.json());


APP.use('/holidays', holidaysController);


APP.listen(PORT, () => {
    console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
});
