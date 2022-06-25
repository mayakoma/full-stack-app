class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // add mess property
    this.code = errorCode;
  }
}
module.exports = HttpError;
