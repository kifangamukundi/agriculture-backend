const allowedOrigins = require('./allowed.origins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200
}

// options for localhost
// if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//     callback(null, true)
// } else {
//     callback(new Error('Not allowed by CORS'));
// }

module.exports = corsOptions;