class ApiResponse {
  constructor(statuscode, data, message = "succes") {
    this.statuscode = statuscode;
    this.data = data;
    this.message = message;
    success = statuscode < 400;
  }
}

export default ApiResponse;
