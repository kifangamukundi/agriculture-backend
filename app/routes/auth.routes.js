const { verifySignUp } = require("../middlewares");
const authController = require("../controllers/auth.controller");

module.exports = function(app) {
  console.log("auth.routes called");

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.handleNewUser
  );

  app.post("/api/auth/signin", authController.handleNewUser);

  app.post("/api/auth/refreshtoken", authController.handleNewUser);
};
