const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 5000,
        dbURL: 'mongodb+srv://kevinezzel92:322311@emazon1.0ctyain.mongodb.net/?retryWrites=true&w=majority&appName=Emazon1',
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];