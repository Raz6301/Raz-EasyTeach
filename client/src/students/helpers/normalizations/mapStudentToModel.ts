import {
  StudentCard,
  studentDetailsFromClientType,
} from "../../models/types/studentTypes";

const mapStudentToModelFunc = (
  student: StudentCard
): studentDetailsFromClientType => {
  return {
    allowedAbsences: String(student.MyArray[0].allowedAbsences!),
    durationOfLesson: String(student.MyArray[0].durationOfLesson),
    price: String(student.MyArray[0].price),
    appartment: String(student.address.appartment),
    city: student.address.city,
    street: student.address.street,
    floor: String(student.address.floor),
    houseNumber: String(student.address.houseNumber),
    email: student.email,
    phone: student.phone,
    _id: student._id,
    user_id: student.MyArray[0].user_id,
  };
};

export default mapStudentToModelFunc;
