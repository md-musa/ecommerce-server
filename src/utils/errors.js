class GeneralError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
  getStatusCode() {
    return 400;
  }
}

class BadRequest extends GeneralError {
  getStatusCode() {
    return 400;
  }
}

class Unauthorized extends GeneralError {
  getStatusCode() {
    return 401;
  }
}

class NotFound extends GeneralError {
  getStatusCode() {
    return 404;
  }
}

class Conflict extends GeneralError {
  getStatusCode() {
    return 409;
  }
}

class InternalServerError extends GeneralError {
  getStatusCode() {
    return 409;
  }
}

class UnprocessableEntity extends GeneralError {
  getStatusCode() {
    return 422;
  }
}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  Unauthorized,
  InternalServerError,
  Conflict,
  UnprocessableEntity,
};
