const mysql = require("mysql2");
const express = require("express");
var cors = require("cors");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const { sequelize } = require("./src/models/index");
// sequelize model loader
const modelInjector = async () => {
  await sequelize.sync();
};
modelInjector();

const connectionParams = {
  user: config.username,
  password: config.password,
  host: config.host,
  database: config.database,
};
var mysqlConnection = mysql.createConnection(connectionParams);

mysqlConnection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql connected");
});

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header(
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});

app.get("/api/visitor", (req, res, next) => {
  mysqlConnection.query("SELECT * FROM visitors", (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

app.post("/api/visitor", (req, res, next) => {
  const value = {
    visitor_name: req.body.visitor_name,
  };

  if (!req.body.visitor_name || req.body.visitor_name === null) {
    res.status(400).json({
      success: false,
      message: "parameter visitor_name doesn't exist",
    });
    next();
    return;
  }
  mysqlConnection.query("INSERT INTO visitors SET ?", value, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.json({
      success: true,
      message: "visitor_name added successfully",
      data: value,
    });
  });
});
