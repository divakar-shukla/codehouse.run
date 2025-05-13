class ApiError extends Error {
  constructor(
    statuscode,
    message = "Something went wrong.",
    error = [],
    stack = "",
  ) {
    super(message);
    this.statuscode = statuscode;
    this.message = message;
    this.success = false;
    this.error = error; 

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.contructor);
    }
  }
}

export default ApiError;
