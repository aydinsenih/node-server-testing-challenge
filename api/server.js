const express = require("express");

const UserRouter = require("./user/user-router");

const server = express();

server.use(express.json());

server.use("/api/users", UserRouter);

server.get("/", (req, res) => {
    res.json({ data: "User API" });
});

server.all("/*", (req, res) => {
    res.json({ data: "Wrong way" });
});

module.exports = server;
