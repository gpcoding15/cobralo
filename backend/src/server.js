const express = require("express");

app = express();

const clients = [
  {
    id: 1,
    name: "Juan Perez",
    email: "juan@email.com",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@email.com",
  },
];

app.get("/clients", (request, response) => {
    response.json(clients)
})

app.get("/", (request, response) => {
    response.send("Cobralo")
});

app.listen(3000, () => {
    console.log("Cobralo API running in port 3000")
})