const fs = require("fs");
const jwt = require("jsonwebtoken");

const privateKey = fs.readFileSync(`${__dirname}/private.key`, "utf8");
const publicKey = fs.readFileSync(`${__dirname}/public.key`, "utf8");

const options = {
  issuer: "MurderBoat",
  expiresIn: "1h",
  algorithm: "RS256"
};

const auth = {
  generateToken: (id, user, isStaff) => {
    const payload = { id, user, isStaff };
    const token = jwt.sign(payload, privateKey, options);
    return token;
  },
  verifyToken: headers => {
    const token = headers.authorization.split(" ")[1];
    try {
      return jwt.verify(token, publicKey, options);
    } catch (e) {
      return false;
    }
  }
};

module.exports = auth;
