const { authJwt } = require("../middlewares");
const controller = require("../controllers/county.controller");

module.exports = function(app) {

app.get("/api/county/all", controller.allCounty);

app.post("/api/county", [authJwt.verifyToken, authJwt.isModerator], controller.createCounty);

app.get("/api/county/:county", controller.getCounty);

app.patch("/api/county/:countyId", [authJwt.verifyToken, authJwt.isModerator], controller.updateCounty);

app.delete("/api/county/:countyId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCounty);
};