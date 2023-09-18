require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/caster", (req, res) => {
  return res.render("caster");
});

app.get("/listener", (req, res) => {
  return res.render("listener");
});

let userCounter = 0;

io.on("connection", (socket) => {
  userCounter = userCounter + 1;
  io.emit("user", userCounter);
  console.log("a user connected, total user :", userCounter);
  socket.on("disconnect", () => {
    userCounter = userCounter - 1;
    io.emit("user", userCounter);
    console.log("a user disconnected");
  });

  socket.on("voiceChat", (msg) => {
    io.emit("voiceChat", msg);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server online", process.env.PORT);
});
