function success(data, statusCode, message) {
  return { status: 1, error: null, data, message, statusCode };
}
export default success;
