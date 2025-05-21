const { Sequelize } = require('sequelize');

// Crează o instanță Sequelize pentru conectarea la baza de date
const sequelize = new Sequelize('Medica', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Verifică conexiunea
sequelize.authenticate()
    .then(() => {
        console.log('Conexiune la baza de date stabilită cu succes.');
    })
    .catch(err => {
        console.error('Nu am reușit să ne conectăm la baza de date:', err);
    });

module.exports = sequelize;
