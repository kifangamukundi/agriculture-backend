const { authJwt } = require("../middlewares");
const controller = require("../controllers/produce.controller");

module.exports = function(app) {

app.get("/api/produce/all", [authJwt.verifyToken, authJwt.isFarmer], controller.allProduce);

app.post("/api/produce", [authJwt.verifyToken, authJwt.isFarmer], controller.createProduce);

app.get("/api/produce/:produceId", [authJwt.verifyToken, authJwt.isFarmer], controller.getProduce);

app.patch("/api/produce/:produceId", [authJwt.verifyToken, authJwt.isFarmer], controller.updateProduce);

app.delete("/api/produce/:produceId", [authJwt.verifyToken, authJwt.isFarmer], controller.deleteProduce);
};