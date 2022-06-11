const { authJwt } = require("../middlewares");
const controller = require("../controllers/county.controller");

module.exports = function(app) {

app.get("/api/county/all", controller.allCounty);

app.post("/api/county", [authJwt.verifyToken], controller.createCounty);

app.get("/api/county/:county", controller.getCounty);

app.patch("/api/county/:countyId", [authJwt.verifyToken], controller.updateCounty);

app.delete("/api/county/:countyId", [authJwt.verifyToken], controller.deleteCounty);
};