const express = require("express");

app = express();

app.get("/", (request, response) => {
    response.send("Hola desde Cobralo")
});

app.listen(3000, () => {
    console.log("Cobralo API running in port 3000")
})