const ErrorHandler = (err, req, res) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';

    res.status(errStatus).json({
        status: errStatus,
        message: errMsg,
    })
}

export default ErrorHandler