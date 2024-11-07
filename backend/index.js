require("dotenv").config();
const express = require("express");
const connectDB = require("./connectDB");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ListenerPlugin } = require("./plugins/listenerPlugin");
const { RouterPlugin } = require("./plugins/routerPlugin");

connectDB();

const app = express();

app
  .use(cors())
  .options("*", cors())
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));
RouterPlugin.setup(app);
ListenerPlugin.listen(app);
