module.exports = {
  secret: process.env.SECRET_KEY,

  jwtExpiration: 3600,
  jwtRefreshExpiration: 86400,
};
