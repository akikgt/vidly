const winston = require('winston');


module.exports = function(err, req, res, next) {
    // winston.error(err.message, [{metaKey: err}]);
    winston.log({
        level: 'error',
        message: err.message,
        meta: err
    });

    res.status(500).send("Something failed.");
}