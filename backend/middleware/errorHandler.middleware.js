import AppError from "../helpers/errors/app.error.js";

const errorHandlerMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.isOperational) {
        return res.json({
            status: err.status,
            message: err.message,
        })
    }

    console.error('ERROR: =(', err);
    return res.status(500).json({
        status: 'error',
        message: 'Algo salió mal, intenta de nuevo',
    });
}

export default errorHandlerMiddleware