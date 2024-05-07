import { EditPayment } from "../../models/types/studentTypes";

const normalizePaymentReq = (student: EditPayment) => {
  return [
    {
      _id: student._id,
      user_id: student.user_id,
      dateOfPaymentRequest: student.dateOfPaymentRequest,
      sumOfPaymentRequest: student.sumOfPaymentRequest,
      paymentSendAndNotReceived: student.paymentSendAndNotReceived,
      studentVerifiedEmail: student.studentVerifiedEmail,
    },
  ];
};

export default normalizePaymentReq;
