const express = require("express");
const controller = require("./controller.js");

const app = express();

/*middleware*/

app.use(express.json());

/*routes*/

app.get("/", (req, res) => {    
    res.send("welcome to the home page");
});

app.listen(3000, "localhost", () => {
    console.log("Server is running on http://localhost:3000");
});

