import { studentDetailsFromClientType } from "../../models/types/studentTypes";

const normalizeEditedDetailsStudent = (
  student: studentDetailsFromClientType
) => {
  return [
    {
      city: student.city,
      street: student.street,
      houseNumber: +student.houseNumber,
      floor: +student.floor,
      appartment: +student.appartment,
      price: +student.price,
      allowedAbsences: +student.allowedAbsences,
      durationOfLesson: +student.durationOfLesson,
      phone: student.phone,
      email: student.email,
      _id: student._id,
      user_id: student.user_id,
      dateOfPaymentRequest: student.dateOfPaymentRequest,
      sumOfPaymentRequest: student.sumOfPaymentRequest,
    },
  ];
};

export default normalizeEditedDetailsStudent;
