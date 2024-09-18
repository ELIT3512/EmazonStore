const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const secret = 'secret';

module.exports = (app) => {
    // Increase the payload size limit to 10mb
    app.use(bodyParser.json({ limit: '100mb' })); // Adjust '10mb' as needed
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); // Adjust '10mb' as needed

    app.use(cookieParser(secret));
};
