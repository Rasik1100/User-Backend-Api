"use strict"
require("dotenv").config();
const bcrypt = require("bcryptjs");  // Using bcryptjs instead of bcrypt because bcrypt requires C compiler 
const jwt = require("jsonwebtoken");
const models = require("../../models");
const privateKey = process.env.PRIVATEKEY;


/**
 * Request Parameter
 * @param {string} email
 * @param {string} name
 * @param {string} password
 */
exports.signUp = async (req, res) => {
    try {
        //base case
        if (!req.body) {
            throw { status: 404, response: "Request body Not Found" };
        }

        //email should not be empty or contains only whitespace
        if (!req.body.email || req.body.email.trim().length === 0) {
            throw { status: 400, response: "email is required" };
        }

        //Password should not be empty or contains only whitespace
        if (!req.body.password || req.body.password.trim().length === 0) {
            throw { status: 400, response: "password is required" };
        }

        //Name should not be empty or contains only whitespace
        if (!req.body.name || req.body.name.trim().length === 0) {
            throw { status: 400, response: "name is required" };
        }

        // storing the hashed password in the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        //Insert the data in the DB 
        await models.User.create({
            email: req.body.email.trim(),
            password: hashedPassword,
            name: req.body.name.trim()
        })
            .then(() => {
                res.status(201).send({ response: "Account has been created Successfully" });
            })
            .catch(() => {   // catch can also be called if there is some connection issue with DB
                throw { status: 409, response: "email already exist" };
            })
    }
    catch (e) {
        // for enhandled error
        if (!e.status || !e.response) {
            res.status(500).send({ response: "Internal Server Error" });
        }
        // for known error
        res.status(e.status).send({ response: e.response });
    }
}


/**
 * Request Parameter
 * @param {string} email
 * @param {string} password
 */
exports.login = async (req, res) => {
    try {
        // base case
        if (!req.body) {
            throw { status: 404, response: "Request body Not Found" };
        }
        //email should not be empty or contains only whitespace
        if (!req.body.email || req.body.email.trim().length === 0) {
            throw { status: 400, response: "email is required" };
        }
        //Password should not be empty or contains only whitespace
        if (!req.body.password || req.body.password.trim().length === 0) {
            throw { status: 400, response: "password is required" };
        }
        //Finding the user for given email
        let user = await models.User.findOne({
            attributes: ["email", "password", "userId"],
            where: {
                email: req.body.email
            }
        })
            .catch(() => {
                throw { status: 500, response: "Database Connection Error" };
            })

        // user will be null if user not found
        if (!user) {
            throw { status: 404, response: "Email not Found" };
        }

        // comparing the hashed password and the password provided by the user by doing hashing to it & adding salt.
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Password matches then creating the jwt token with relavent data.
            const userData = {
                userId: user.userId,
                email: user.email,
            };

            const issuer = 'test';
            const subject = 'some@test.com';
            const audience = 'http://user.test.in';

            const jwtSignConfig = {
                issuer: issuer,
                subject: subject,
                audience: audience,
                expiresIn: "4d",   // jwt token will expire after 4 days
                algorithm: "HS256"
            };

            const jwtToken = jwt.sign(userData, privateKey, jwtSignConfig);
            res.status(200).send({ jwtToken });
        }
        else {
            throw { status: 401, response: "Password is incorrect" };
        }

    }
    catch (e) {
        if (!e.status || !e.response) {
            res.status(500).send({ response: "Internal Server Error" });
        }
        res.status(e.status).send({ response: e.response });
    }
}