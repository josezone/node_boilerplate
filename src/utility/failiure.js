export default (error, statusCode, message) => ({
  status: 0,
  error,
  data: null,
  message,
  statusCode
});
