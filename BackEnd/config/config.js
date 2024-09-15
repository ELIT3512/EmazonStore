const env = process.env.NODE_ENV || 'development';
require('dotenv').config();
const mgPass = process.env.mgPass;


const config = {
    development: {
        port: process.env.PORT || 5000,
        dbURL: `mongodb+srv://kevinezzel92:${mgPass}@emazon1.0ctyain.mongodb.net/?retryWrites=true&w=majority&appName=Emazon1`,
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];