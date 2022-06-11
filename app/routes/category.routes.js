const { authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller");

module.exports = function(app) {

app.get("/api/category/all", controller.allCategory);

app.post("/api/categoty", [authJwt.verifyToken], controller.createCategory);

app.get("/api/category/:categoryId", controller.getCategory);

app.patch("/api/category/:categoryId", [authJwt.verifyToken], controller.updateCategory);

app.delete("/api/category/:categoryId", [authJwt.verifyToken], controller.deleteCategory);
};