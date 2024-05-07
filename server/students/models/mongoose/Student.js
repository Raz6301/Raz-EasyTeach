const regexType = (regex, required = false, unique = false) => {
  return { type: String, required, match: RegExp(regex), unique, trim: true };
};

const mongoose = require("mongoose");
const newschema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  price: { type: Number, required: true },
  isAttended: { type: Boolean, required: true },
  payment: { type: Number, required: true },
  absences: { type: Date },
  id: { type: Number, required: true },
  allowedAbsences: { type: Number, required: true },
  durationOfLesson: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    trim: true,
    lowercase: true,
  },
  street: {
    type: String,
    trim: true,
    lowercase: true,
  },
  houseNumber: { type: Number },
  floor: { type: Number },
  appartment: { type: Number },
});

const schema = new mongoose.Schema({
  MyArray: [newschema],
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  address: addressSchema,
  phone: regexType(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  email: regexType(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    true,
    true
  ),
  dateOfPaymentRequest: { type: Date },
  sumOfPaymentRequest: { type: Number },
  paymentSendAndNotReceived: { type: Boolean, default: false },
  studentVerifiedEmail: { type: String, default: "" },
});

const Student = mongoose.model("student", schema);

module.exports = Student;
