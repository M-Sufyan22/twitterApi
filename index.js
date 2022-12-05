const dotenv = require("dotenv");
const express = require("express");
var cors = require("cors");
const app = express();
var twitter = require("twitter-api-sdk");

//
var corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
// dotEnv
dotenv.config({ path: "./config.env" });

app.use(express.json());

// port
let port = process.env.PORT;

// Twitter config
const { Client } = twitter;
const client = new Client(process.env.BEARER_TOKEN);

//
app.get("/getTweet/:id", async(req, res) => {
    let { id } = req.params;
    if (!id) return res.status(400).send({ message: "Id is required" });
    //
    client.tweets
        .findTweetById(id)
        .then((response) => {
            return res.status(200).send({ data: response.data, message: "OK" });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).send({ message: err.title || "Tweet not found!" });
        });
});

//
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});