const { get } = require("lodash");

const requiresUser = async (req, res, next) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

module.exports = requiresUser;
