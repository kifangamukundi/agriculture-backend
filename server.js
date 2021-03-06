require('dotenv').config();
const express = require("express");
const app = express();

const cors = require('cors');
const corsOptions = require('./app/config/cors.options');
const mongoose = require('mongoose');
const connectDB = require('./app/config/db.connection');

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Access-Control-Allow-Origin, Content-Type,Accept, Authorization, Origin, Accept, X-Requested-With,Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // handle OPTIONS method
  if ('OPTIONS' == req.method) {
      return res.sendStatus(200);
  } else {
      next();
  }
});

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

const db = require("./app/models");
const Role = db.role;

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to kifanga application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/produce.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/progress.routes")(app);
require("./app/routes/collectionLocation.routes")(app);
require("./app/routes/collectionCenter.routes")(app);
require("./app/routes/county.routes")(app);
require("./app/routes/countyPlace.routes")(app);


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "farmer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'farmer' to roles collection");
      });
      new Role({
        name: "transporter"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'transporter' to roles collection");
      });
      new Role({
        name: "fieldAgent"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'fieldAgent' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Configurations for environment variables
// PORT=5000
// DATABASE_URI=""
// SECRET_KEY=""