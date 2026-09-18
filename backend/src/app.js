const express = require("express");

const app = express();

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

app.use(express.json());

app.get("/", (request, response) => {
    response.send("Cobralo")
});

app.get("/clients", (request, response) => {
    response.json(clients)
});

app.post("/clients", (request, response) => {
    const new_client = {
        id: clients.length + 1,
        name: request.body.name,
        email: request.body.email
    };

    clients.push(new_client);

    response.status(201).json(new_client);
});

module.exports = app;