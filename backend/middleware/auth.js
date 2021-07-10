const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let jwtToken = req.header("Authorization");
  if (!jwtToken)
    return res.status(401).send("Authorization denied: there is no token");

  jwtToken = jwtToken.split(" ")[1];
  if (!jwtToken)
    return res.status(401).send("Authorization denied: there is no token");

  try {
    const payload = await jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).send("Authorization denied: the token is invalid");
  }
};

module.exports = auth;
