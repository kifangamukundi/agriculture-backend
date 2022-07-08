const allowedOrigins = require('./allowed.origins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: ["Origin", "Access-Control-Allow-Origin", "Content-Type",
    "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
    "Access-Control-Request-Method", "Access-Control-Request-Headers"],
    exposedHeaders: ["Origin", "Content-Type", "Accept", "Authorization",
    "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200
}

// options for localhost
// if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//     callback(null, true)
// } else {
//     callback(new Error('Not allowed by CORS'));
// }

module.exports = corsOptions;