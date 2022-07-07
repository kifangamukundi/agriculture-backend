const allowedOrigins = require('./allowed.origins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
          } else {
            next();
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