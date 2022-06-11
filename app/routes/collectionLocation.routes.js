const { authJwt } = require("../middlewares");
const controller = require("../controllers/collectionLocation.controller");

module.exports = function(app) {

app.get("/api/collectionLocation/all", controller.allCollectionLocation);

app.post("/api/collectionLocation", [authJwt.verifyToken], controller.createCollectionLocation);

app.get("/api/collectionLocation/:collectionLocationId", controller.getCollectionLocation);

app.patch("/api/collectionLocation/:collectionLocationId", [authJwt.verifyToken], controller.updateCollectionLocation);

app.delete("/api/collectionLocation/:collectionLocationId", [authJwt.verifyToken], controller.deleteCollectionLocation);
};