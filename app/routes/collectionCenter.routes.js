const { authJwt } = require("../middlewares");
const controller = require("../controllers/collectionCenter.controller");

module.exports = function(app) {

app.get("/api/collectionCenter/all", controller.allCollectionCenter);

app.post("/api/collectionCenter", [authJwt.verifyToken, authJwt.isModerator], controller.createCollectionCenter);

app.get("/api/collectionCenter/:collectionCenterId", controller.getCollectionCenter);

app.patch("/api/collectionCenter/:collectionCenterId", [authJwt.verifyToken, authJwt.isModerator], controller.updateCollectionCenter);

app.delete("/api/collectionCenter/:collectioCenterId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCollectionCenter);
};