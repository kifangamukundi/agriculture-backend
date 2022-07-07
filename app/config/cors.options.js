const allowedOrigins = require('./allowed.origins');

const corsOptions = {
    origin: (origin, callback) => {
        if ((allowedOrigins.indexOf(origin) !== -1) && ('OPTIONS' == req.method)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

// options for localhost
// if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//     callback(null, true)
// } else {
//     callback(new Error('Not allowed by CORS'));
// }

module.exports = corsOptions;