const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("./config/passportConfig");
const MongoDBStore = require("connect-mongodb-session")(session);
const expressLayouts = require("express-ejs-layouts");

// routes
const loginRoutes = require("./routes/login");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

mongoose
  .connect("mongodb://127.0.0.1:27017/bestBlog")
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

app.use("/", loginRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
