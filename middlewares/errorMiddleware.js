const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || `error`;
    if(process.env.NODE_ENV === "development"){
        sendErrorForDev(err, res);
    }
    else if(process.env.NODE_ENV === "production"){
        sendErrorForPro(err, res);
    }
};

const sendErrorForDev = (err, res) =>{
    res.status(err.statusCode).json({ 
        // error: err,
            statusCode: err.statusCode,
            status: err.status,
            isOperational: err.isOperational,
            message: err.message,
            stack: err.stack, 
      });
};

const sendErrorForPro = (err, res) =>{
    res.status(err.statusCode).json({ 
        // error: err,
            statusCode: err.statusCode,
            status: err.status,
            message: err.message,
      });
};

module.exports = globalError;