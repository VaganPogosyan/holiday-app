const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const db = mongoose.connection;

const holidaysController = require('./controllers/holidays');

const APP = express();
const PORT = process.env.PORT || 3003;
const DBNAME = 'holidays';

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DBNAME}`;

// connect ot mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// mongoose.connection.once('open', () => {
//     console.log('connected to mongoose...');
// });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open', () => { });

/*
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
*/

// APP.use(cors(corsOptions));

APP.use(express.json());


APP.use('/holidays', holidaysController);


APP.listen(PORT, () => {
    console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
});
