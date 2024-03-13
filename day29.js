function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500);


    res.json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
}

module.exports = errorHandler;
