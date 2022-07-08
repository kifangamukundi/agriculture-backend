const allowedOrigins = require('./allowed.origins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
            console.log('Not allowed by CORS here!!!!!!!!');
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;