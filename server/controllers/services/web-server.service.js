// controllers/services/web-server.service.js
const express = require('express');
const { configureCors } = require('./cors.service');
const routes = require('../routes/routes'); // sau după structură

let app;

const startWebServer = async () => {
  app = express();

  // 🔐 Middleware
  app.use(express.json());

  // 🌍 CORS configurat corect
  app.use(configureCors());

  // 🔁 Rute
  app.use('/',routes);

  const port = process.env.PORT || 1000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

module.exports = {
  startWebServer,
};
