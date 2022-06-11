const { authJwt } = require("../middlewares");
const controller = require("../controllers/collectionLocation.controller");

module.exports = function(app) {

app.get("/api/collectionLocation/all", controller.allCollectionLocation);

app.post("/api/collectionLocation", [authJwt.verifyToken, authJwt.isModerator], controller.createCollectionLocation);

app.get("/api/collectionLocation/:collectionLocationId", controller.getCollectionLocation);

app.patch("/api/collectionLocation/:collectionLocationId", [authJwt.verifyToken, authJwt.isModerator], controller.updateCollectionLocation);

app.delete("/api/collectionLocation/:collectionLocationId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCollectionLocation);
};