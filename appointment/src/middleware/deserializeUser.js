const { get } = require("lodash");
const { decode } = require("../helper/jwt.utils");

const deserializeUser = async (req, res, next) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);

  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
};

module.exports = deserializeUser;
