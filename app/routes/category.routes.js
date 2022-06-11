const { authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller");

module.exports = function(app) {

app.get("/api/category/all", controller.allCategory);

app.post("/api/category", [authJwt.verifyToken, authJwt.isModerator], controller.createCategory);

app.get("/api/category/:categoryId", controller.getCategory);

app.patch("/api/category/:categoryId", [authJwt.verifyToken, authJwt.isModerator], controller.updateCategory);

app.delete("/api/category/:categoryId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCategory);
};