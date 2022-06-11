const { authJwt } = require("../middlewares");
const controller = require("../controllers/progress.controller");

module.exports = function(app) {

app.get("/api/progress/all", controller.allProgress);

app.post("/api/progress", [authJwt.verifyToken], controller.createProgress);

app.get("/api/progress/:progressId", controller.getProgress);

app.patch("/api/progress/:progressId", [authJwt.verifyToken], controller.updateProgress);

app.delete("/api/progress/:progressId", [authJwt.verifyToken], controller.deleteProgress);
};