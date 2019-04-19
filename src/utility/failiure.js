function failure(error, statusCode, message) {
  return { status: 0, error, data: null, message, statusCode };
}

export default failure;
