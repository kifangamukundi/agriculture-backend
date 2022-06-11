const { authJwt } = require("../middlewares");
const controller = require("../controllers/countyPlace.controller");

module.exports = function(app) {

app.get("/api/countyPlace/all", controller.allCountyPlace);

app.post("/api/countyPlace", [authJwt.verifyToken, authJwt.isModerator], controller.createCountyPlace);

app.get("/api/countyPlace/:countyPlaceId", controller.getCountyPlace);

app.patch("/api/countyPlace/:countyPlaceId", [authJwt.verifyToken, authJwt.isModerator], controller.updateCountyPlace);

app.delete("/api/countyPlace/:countyPlaceId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCountyPlace);
};