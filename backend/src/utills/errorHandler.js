const errorHandler = (err, req, res, next)=>{
    const statuscode = err.statuscode || 500;

    res.status(statuscode).json({
        statuscode,
        message:err.message || "internal server error",
        success:false,
        error: err.error || [],
        ...(process.env.NODE_ENV != "production" && {stack:err.stack})

    })
}
export default errorHandler;