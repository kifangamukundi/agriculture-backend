const { authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller");

module.exports = function(app) {

app.get("/api/categories", controller.allCategory);

app.post("/api/categories", [authJwt.verifyToken, authJwt.isModerator], controller.createCategory);

app.get("/api/categories/:categoryId", controller.getCategory);

app.patch("/api/categories/:categoryId", [authJwt.verifyToken, authJwt.isModerator], controller.updateCategory);

app.delete("/api/categories/:categoryId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCategory);
};