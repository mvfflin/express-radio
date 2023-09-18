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

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(process.env.PORT, () => {
  console.log("Server online", process.env.PORT);
});
