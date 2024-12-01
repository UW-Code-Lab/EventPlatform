const express = require("express");


const app = express();

app.get("/", (req, res) => {    
    res.send("welcome to the home page");
});

app.listen(3000, "localhost", () => {
    console.log("Server is running on http://localhost:3000");
});

