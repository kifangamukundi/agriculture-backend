const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.product = require("./product.model");
db.category = require("./category.model");
db.produce = require("./produce.model");
db.progress = require("./progress.model");
db.collectionLocation = require("./collectionLocation.model");
db.collectionCenter = require("./collectionCenter.model");
db.county = require("./county.model");
db.countyPlace = require("./countyPlace.model");

db.ROLES = ["farmer", "transporter", "fieldAgent", "moderator", "admin"];

module.exports = db;