const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Interval server error"

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}