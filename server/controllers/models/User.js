
const { DataTypes } = require('sequelize');
const sequelize = require('../auth/sequelize'); // ajustează dacă ai alt path către configul DB

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmPassword: {
        type: DataTypes.VIRTUAL, // nu se salvează în DB, doar pt validare
        set(value) {
            if (value !== this.password) {
                throw new Error("Parolele nu se potrivesc.");
            }
            this.setDataValue('confirmPassword', value);
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2 // presupunem că rolul utilizatorului este 2 (utilizator standard)
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    otpVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
}, {
    tableName: 'users', // sau cum ai tu definit în DB
    timestamps: true
});

module.exports = User;
