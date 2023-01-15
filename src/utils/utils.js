const { promisify } = require("util");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signPromise = promisify(JWT.sign);
const verifyPromise = promisify(JWT.verify);
const genSaltPromise = promisify(bcrypt.genSalt);
const hashPromise = promisify(bcrypt.hash);
const comparePromise = promisify(bcrypt.compare);

async function hashPassword(password) {
  const salt = await genSaltPromise(11);
  const hashedPassword = await hashPromise(password, salt);
  return hashedPassword;
}

module.exports = {
  JWT: {
    signPromise,
    verifyPromise,
  },
  bcrypt: {
    comparePromise,
    hashPassword,
  },
};
