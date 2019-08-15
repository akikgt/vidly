const winston = require('winston');
winston.add(new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), winston.format.simple())
}));

const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {winston.info(`Listening on port ${port}...`)});

module.exports = server;