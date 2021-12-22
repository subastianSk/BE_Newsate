require("dotenv").config();

const express = require("express");
const { sequelize } = require("./models");

const app = express();
const PORT = Number(process.env.APP_PORT) || 8080;

app.use(express.json());

// db connect
sequelize
  .authenticate()
  .then(async () => {
    console.info("db connection established");

    // express server starting
    app.listen(PORT, () => {
      console.info(`app listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.info("unable to connect to database");
    console.error(err);
  });
