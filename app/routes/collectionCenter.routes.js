const { authJwt } = require("../middlewares");
const controller = require("../controllers/collectionCenter.controller");

module.exports = function(app) {

app.get("/api/collectionCenter/all", controller.allCollectionCenter);

app.post("/api/collectionCenter", [authJwt.verifyToken], controller.createCollectionCenter);

app.get("/api/collectionCenter/:collectionCenterId", controller.getCollectionCenter);

app.patch("/api/collectionCenter/:collectionCenterId", [authJwt.verifyToken], controller.updateCollectionCenter);

app.delete("/api/collectionCenter/:collectioCenterId", [authJwt.verifyToken], controller.deleteCollectionCenter);
};