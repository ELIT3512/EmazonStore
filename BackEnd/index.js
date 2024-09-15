const config = require('./config/config');
const dbConnection = require('./config/database');
const express = require('express')
const app = express();
const cors = require('cors');
dbConnection.then(() => {
    app.use(cors({
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        credentials: true // Allow credentials if needed
      }));
    app.use(express.json())
    require('./config/express')(app);

    require('./config/routes')(app);
    

    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send(err.message);
        console.log('*'.repeat(90))
    });

    app.listen(config.port, console.log(`Listening on port ${config.port}!`))

}).catch(console.error);