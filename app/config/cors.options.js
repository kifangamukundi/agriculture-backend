const allowedOrigins = require('./allowed.origins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightcontinue: false,
    optionsSuccessStatus: 204
}

// options for localhost
// if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//     callback(null, true)
// } else {
//     callback(new Error('Not allowed by CORS'));
// }

module.exports = corsOptions;