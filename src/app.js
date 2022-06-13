const express = require("express")
const serverless = require("serverless-http");
const bot = require("./bot")
const app = express();
const router = express.Router();

setInterval(function A() {
    console.log("started")
    bot()
}, 3.6e+6);
router.get("/", async(req, res) => {
    bot()
    return res.json({"msg": "bot runing"})

})


app.use(`/.netlify/functions/app`, router);


module.exports = app;
module.exports.handler = serverless(app);
