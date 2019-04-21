import Joi from "joi";
import failure from "../utility/failiure";

const schema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
});

function validatePost(req, res, next) {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    const message = failure(result.error.details, 412, "validation error");
    res.status(412).json(message);
  } else {
    next();
  }
}

function validate(req, res, next) {
  switch (req.method) {
    case "POST": {
      validatePost(req, res, next);
      break;
    }
    default: {
      const message = failure(req.method, 412, "unknown method");
      res.status(412).json(message);
    }
  }
}

export default validate;
