// Error Middleware || NEXT function
const errorMiddleware = (err, req, res, next) => {
    console.log('Full error object:', err);

    const defaultErrors = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong',
    }

    // Missing field error
    if (err.name === 'ValidationError') {
        defaultErrors.statusCode = 400;
        defaultErrors.message = Object.values(err.errors).map((item) => item.message).join(',');
    }

    // Duplicate key error
    if (err.code && err.code === 11000) {
        defaultErrors.statusCode = 400;
        // err.keyValue should have the field causing the duplicate key error
        const field = Object.keys(err.keyValue)[0];
        defaultErrors.message = `${field} field has to be unique`;
    }

    // Send response with the appropriate status and message
    res.status(defaultErrors.statusCode).json({
        message: defaultErrors.message
    });

};

export default errorMiddleware;

