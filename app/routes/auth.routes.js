const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const cors = require('cors');

module.exports = function(app) {
  app.options('*', cors()) // include before other routes
  console.log("auth.routes called");

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/refreshtoken", controller.refreshToken);
};
