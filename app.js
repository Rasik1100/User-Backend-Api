/**
 * Name : Rasik Mahajan
 * Mob  : 9098550361
 * E-mail : rasikmahajan84@gmail.com
 */
require("dotenv").config()

const express = require('express');

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
const helmet = require("helmet");

const cors = require("cors");

app.use(cors({
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}));

app.use(helmet({ policy: 'no-referrer' }));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


const port = process.env.PORT;

app.listen(port, () => console.log(`Listening to Port ${port}`));

//DB Connection
const db = require("./models");

db.sequelize.sync({ debug: false })
    .then(() => {
        console.log("Connection Established 👍");

        const publicRoute = require("./src/routes/publicRoute");
        app.use("/", publicRoute);

        const authenticationMiddleWare = require("./src/middlewares/auth");
        app.use(authenticationMiddleWare);

        app.get("/validateToken", (req, res) => {
            res.status(200).send({ response: "Token is valid" });
        })

    })
    .catch((e) => {
        console.log(e);
    })