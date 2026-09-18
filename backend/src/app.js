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

app.get("/clients/:id", (request, response) => {
    const clientId = Number(request.params.id);

    const client = clients.find((c) => c.id === clientId)

    if(!client) return response.status(404).json({"error": "Client not found"});

    response.status(200).json(client);
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