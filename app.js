const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("./config/passportConfig");
const MongoDBStore = require("connect-mongodb-session")(session);
const expressLayouts = require("express-ejs-layouts");
const WebSocket = require("ws");

// routes
const loginRoutes = require("./routes/login");
const createAccountRoutes = require("./routes/create-account");
const playRoutes = require("./routes/play");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");
app.use("/assets", express.static("assets"));
mongoose
  .connect("mongodb://127.0.0.1:27017/fullstackBCA1")
  .then((conn) => console.log(conn.models));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore(
      {
        mongoURL: "mongodb://127.0.0.1:27017",
        collection: "fullstackBCA1",
      },
      (error) => console.log(error)
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/login", loginRoutes);
app.use("/create-account", createAccountRoutes);
app.use("/play", playRoutes);

const httpServer = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const wsServer = new WebSocket.Server({ noServer: true });

let currentId = 1;

httpServer.on("upgrade", async (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit("connection", ws, request);
  });
});

wsServer.on("connection", (ws, req) => {
  ws.id = currentId++;
  ws.on("message", (message) => {
    wsServer.clients.forEach((client) => {
      if (client.readyState == WebSocket.OPEN) {
        console.log(client.id);
      }
    });
  });
});
