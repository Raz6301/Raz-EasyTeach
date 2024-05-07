const Joi = require("joi");
const REQUIRED_FIELD = Joi.string().min(2).max(256).required();

const message = (regex, message, required = true) => {
  if (required)
    return Joi.string()
      .ruleset.regex(regex)
      .rule({ message: message })
      .required();

  return Joi.string().ruleset.regex(regex).rule({ message: message }).allow("");
};

const validateStudent = (card) => {
  const schema = Joi.array().items(
    Joi.object({
      title: Joi.string(),
      start: Joi.date(),
      end: Joi.date(),
      price: Joi.number(),
      isAttended: Joi.boolean(),
      payment: Joi.number().allow(""),
      absences: Joi.date().allow(null),
      id: Joi.number(),
      allowedAbsences: Joi.number(),
      durationOfLesson: Joi.number(),
      user_id: Joi.string().allow(""),
      _id: Joi.string().allow(""),
      city: Joi.string().allow(""),
      street: Joi.string().allow(""),
      houseNumber: Joi.number().allow(""),
      floor: Joi.number().allow(""),
      appartment: Joi.number().allow(""),
      phone: message(
        /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
        'card "phone" mast be a valid phone number',
        false
      ),
      email: message(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        'card "mail" mast be a valid mail',
        false
      ),
      dateOfPaymentRequest: Joi.date().allow(null),
      sumOfPaymentRequest: Joi.number(),
      paymentSendAndNotReceived: Joi.boolean(),
      studentVerifiedEmail: Joi.string().allow(""),
    })
  );
  // });

  return schema.validate(card);
};

module.exports = validateStudent;
