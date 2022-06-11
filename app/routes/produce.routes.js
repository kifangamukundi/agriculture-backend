const { authJwt } = require("../middlewares");
const controller = require("../controllers/produce.controller");

module.exports = function(app) {

app.get("/api/produce/all", controller.allProduce);

app.post("/api/produce", [authJwt.verifyToken], controller.createProduce);

app.get("/api/produce/:produceId", controller.getProduce);

app.patch("/api/produce/:produceId", [authJwt.verifyToken], controller.updateProduce);

app.delete("/api/produce/:produceId", [authJwt.verifyToken], controller.deleteProduce);
};