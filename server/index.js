require('dotenv').config();
const webServerService = require('./controllers/services/web-server.service');
const routes = require('./controllers/routes/routes');
const init = async () => {
    try{
    await webServerService.startWebServer();
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('Web server started successfully');
    } catch (e) {
        console.error('Error starting web server:', e);
    }
}
init();