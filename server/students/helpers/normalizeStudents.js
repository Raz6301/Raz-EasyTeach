const { generateUniqueEmail } = require("../../utils/generateUniqueEmail");

const normalizeStudents = async (rawCard, userId) => {
  const normalizedArray = rawCard.map((item) => {
    return {
      ...item,
      start: Date.parse(item.start),
      end: Date.parse(item.end),
      absences: item.absences ? Date.parse(item.absences) : null,
      user_id: rawCard[0].user_id || userId,
    };
  });

  return {
    MyArray: normalizedArray,
    user_id: rawCard[0].user_id || userId,
    address: {
      city: rawCard[0].city || "0",
      street: rawCard[0].street || "0",
      houseNumber: rawCard[0].houseNumber || 0,
      floor: rawCard[0].floor || 0,
      appartment: rawCard[0].appartment || 0,
    },
    phone: rawCard[0].phone || "",
    email: rawCard[0].email || generateUniqueEmail(),
    dateOfPaymentRequest: rawCard[0].dateOfPaymentRequest
      ? Date.parse(rawCard[0].dateOfPaymentRequest)
      : null,
    sumOfPaymentRequest: rawCard[0].sumOfPaymentRequest || 0,
    paymentSendAndNotReceived: rawCard[0].paymentSendAndNotReceived || false,
    studentVerifiedEmail: rawCard[0].studentVerifiedEmail || "",
  };
};

module.exports = normalizeStudents;
