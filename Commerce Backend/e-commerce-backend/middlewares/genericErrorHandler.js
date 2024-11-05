const genericErrorHandler = (err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || 'Oops, qualcosa è andato storto';

    res.status(errorStatus).send({
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
};

module.exports = genericErrorHandler;
