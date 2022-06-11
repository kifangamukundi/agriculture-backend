const { authJwt } = require("../middlewares");
const controller = require("../controllers/progress.controller");

module.exports = function(app) {

app.get("/api/progress/all", [authJwt.verifyToken, authJwt.isFarmer], controller.allProgress);

app.post("/api/progress", [authJwt.verifyToken, authJwt.isFarmer], controller.createProgress);

app.get("/api/progress/:progressId", [authJwt.verifyToken, authJwt.isFarmer], controller.getProgress);

app.patch("/api/progress/:progressId", [authJwt.verifyToken, authJwt.isFarmer], controller.updateProgress);

app.delete("/api/progress/:progressId", [authJwt.verifyToken, authJwt.isFarmer], controller.deleteProgress);
};