module.exports = (err, req, res, next) => {
    let error = {
        error: {
            status: err.status || 500,
            Message: err.message || "Internal Server Error"
        }
    }
    return (res.status(error.error.status).json(error));
}