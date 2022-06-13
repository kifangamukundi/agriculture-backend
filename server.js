const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

let corsOptions = {
  origin: "*",
  credentials:true,
  optionSuccessStatus:200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://kifanga:64GB1995@kifanga.nefle.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
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
