const { authJwt } = require("../middlewares");
const controller = require("../controllers/countyPlace.controller");

module.exports = function(app) {

app.get("/api/countyPlace/all", controller.allCountyPlace);

app.post("/api/countyPlace", [authJwt.verifyToken], controller.createCountyPlace);

app.get("/api/countyPlace/:countyPlaceId", controller.getCountyPlace);

app.patch("/api/countyPlace/:countyPlaceId", [authJwt.verifyToken], controller.updateCountyPlace);

app.delete("/api/countyPlace/:countyPlaceId", [authJwt.verifyToken], controller.deleteCountyPlace);
};