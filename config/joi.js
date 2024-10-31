import Joi from "joi";

export const sigiInSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  branch:Joi.string().required(),
  college:Joi.string().required(),
  year:Joi.string().required(),
});

export const loginSchema = Joi.object({
    value: Joi.string().required(),
    password: Joi.string().required(),
  });

