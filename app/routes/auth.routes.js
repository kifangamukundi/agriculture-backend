const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const cors = require('cors');

module.exports = function(app) {
  app.options('*', cors()) // include before other routes
  console.log("auth.routes called");

  app.post(
    "/api/auth/signup", cors(),
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", cors(), controller.signin);

  app.post("/api/auth/refreshtoken", cors(), controller.refreshToken);
};
