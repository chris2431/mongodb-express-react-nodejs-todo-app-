import fs from "fs";
import jsonwebtoken from "jsonwebtoken";

// ISSUE JWT

const PRIV_KEY = fs.readFileSync("id_rsa_priv.pem", { encoding: "utf8" }, import.meta.url);

export const issueJWT = (userId) => {
  const expiresIn = "1d";

  const payload = {
    sub: userId,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn: expiresIn,
  };
};
