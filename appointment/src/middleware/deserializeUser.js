import { get } from "lodash";
import { decode } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

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

export default deserializeUser;
