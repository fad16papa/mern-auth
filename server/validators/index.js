import { validationResult } from "express-validator";

const runValidation = (req, res, next) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};

export { runValidation };
