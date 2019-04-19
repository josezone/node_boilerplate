import path from "path";
import config from "../config/config";

function swaggerMiddleware({ query: { user, pass }, path: url }, res, next) {
  if (url === "/") {
    if (user === config.SWAGGER_USER && pass === config.SWAGGER_PASSWORD) {
      next();
    } else {
      res.status(404).sendFile(path.join(__dirname, "../views/api-docs.html"));
    }
  } else {
    next();
  }
}

export default swaggerMiddleware;
