const express = require('express');
const router = require('../routes');
const app = express();
const PORT = process.env.PORT || 1000;

const Methods = {
    startWebServer: () => {
        app.use(router);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
    });
}
}

module.exports = Methods;
