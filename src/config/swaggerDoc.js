import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerAuth from "../middlewares/swagger.auth";

let spec;
try {
  spec = YAML.load(path.join(__dirname, "swagger.yaml"));
} catch (err) {
  spec = YAML.load("swagger.yaml");
}

function swaggerDoc(app) {
  app.use(
    "/api-docs",
    swaggerAuth,
    swaggerUi.serve,
    swaggerUi.setup(spec, {
      customCss: ".swagger-ui .topbar { display: none }"
    })
  );
}

export default swaggerDoc;
