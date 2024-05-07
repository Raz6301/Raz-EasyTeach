import Joi from "joi";

const studentEditSchema = {
  _id: Joi.string(),
  title: Joi.string(),
  phone: Joi.string()
    .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({ message: 'card "phone" mast be a valid phone number' })
    .allow(""),
  email: Joi.string()
    .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: 'card "mail" mast be a valid mail' })
    .allow(""),
  city: Joi.string().allow(""),
  street: Joi.string().allow(""),
  houseNumber: Joi.number().allow(""),
  floor: Joi.number().allow(""),
  appartment: Joi.number().allow(""),
  user_id: Joi.string(),
  start: Joi.date(),
  end: Joi.date(),
  price: Joi.number().required(),
  allowedAbsences: Joi.number().required(),
  durationOfLesson: Joi.number().required(),
  isAttended: Joi.boolean(),
  payment: Joi.number(),
  id: Joi.number(),
};

export default studentEditSchema;
