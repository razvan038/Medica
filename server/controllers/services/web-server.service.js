// controllers/services/web-server.service.js
const express = require('express');
const { configureCors } = require('./cors.service');
const routes = require('../routes/routes'); 
const protectedRoutes = require('../routes/protectedRoutes')

let app;

const startWebServer = async () => {
  app = express();

  // 🔐 Middleware
  app.use(express.json());

  // 🌍 CORS configurat corect
  app.use(configureCors());

  // 🔁 Rute
  app.use('/',routes);

  // 🔐 Rute protejate
  app.use('/api', protectedRoutes)

  const port = process.env.PORT || 1000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

module.exports = {
  startWebServer,
};
