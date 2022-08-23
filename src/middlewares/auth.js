require("dotenv").config();
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATEKEY;

module.exports = authenticationMiddleWare = async (req, res, next) => {

    // base case
    if (!req.headers.authorization) {
        return res.status(401).send("Authorization header is missing");
    }

    // extracting the jwt token from the header
    let token = req.headers.authorization.split(" ")[1];

    // if token is not present
    if (token === "null") {
        return res.status(401).send("JWT Token is missing");
    }

    // if token is present then verify it.
    let payload;
    try {
        const issuer = 'test';
        const subject = 'some@test.com';
        const audience = 'http://user.test.in';

        const jwtSignConfig = {
            issuer: issuer,
            subject: subject,
            audience: audience,
            expiresIn: "4d",
            algorithm: "HS256"
        };
        payload = jwt.verify(token.toString(), privateKey, jwtSignConfig);
    } catch (err) {
        return res.status(401).send("Invalid JWT Token");
    }

    if (!payload) {
        return res.status(401).send("Payload is empty in Token");
    }

    req.username = payload.username;
    req.userId = payload.userId;
    req.userType = payload.userType;

    await next();
}
