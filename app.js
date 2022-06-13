const express = require("express")
const bot = require("./bot")
const app = express()
const port = process.env.PORT || 3000


setInterval(function A() {
    console.log("started")
    bot()
}, 2.16e+7);
app.get("/", async(req, res) => {
    bot()
    return res.json({"msg": "bot runing"})

})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})


