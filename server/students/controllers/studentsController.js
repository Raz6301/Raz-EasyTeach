const { handleError } = require("../../utils/errorHandler");
const lodash = require("lodash");
const Student = require("../models/mongoose/Student");
const normalizeStudents = require("../helpers/normalizeStudents");
const validateStudent = require("../models/joi/validateStudent");
const DeletedStudents = require("../models/mongoose/DeleteStudents");
const {
  SESClient,
  VerifyEmailAddressCommand,
  SendEmailCommand,
  ListVerifiedEmailAddressesCommand,
} = require("@aws-sdk/client-ses");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

const ses = new SESClient({
  credentials: fromIni(),
  region: "us-east-1",
});

const getStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student)
      throw new Error("could not find this student in the database");
    Promise.resolve(student);
    return res.send(student);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getMyStudents = async (req, res) => {
  try {
    const user = req.user;
    const students = await Student.find({ user_id: user._id });
    if (!students) throw new Error("could not find any card in the database");
    Promise.resolve(students);
    return res.send(students);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const createStudent = async (req, res) => {
  try {
    const student = req.body;
    const user = req.user;
    if (!user.isBusiness)
      throw new Error(
        "You must be a business type user in order to create a new student"
      );

    const { error } = validateStudent(student);
    if (error)
      return handleError(res, 400, `joi error: ${error.details[0].message}`);

    const normalizedStudent = await normalizeStudents(student, user._id);
    const studentToDB = new Student(normalizedStudent);
    const studentFromDB = await studentToDB.save();
    Promise.resolve(studentFromDB);
    return res.send(studentFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const EditStudent = async (req, res) => {
  try {
    const student = req.body;
    const { studentId } = req.params;
    const user = req.user;
    if (user._id !== student[0].user_id) {
      const message =
        "Authorization Error: Only the user who created the student can update its details";
      return handleError(res, 403, message);
    }

    const { error } = validateStudent(student);
    if (error)
      return handleError(res, 400, `joi error: ${error.details[0].message}`);

    const normalizedEditedStudent = await normalizeStudents(student);

    const newStudent = await Student.findOneAndUpdate(
      { "MyArray._id": student[0]._id },
      { $set: { "MyArray.$": normalizedEditedStudent.MyArray[0] } },
      { new: true }
    );

    if (!newStudent) {
      return handleError(res, 404, "Object not found.");
    }

    Promise.resolve(newStudent);
    return res.send(newStudent);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const EditStudentDay = async (req, res) => {
  try {
    const student = req.body;
    console.log(student);
    const user = req.user;
    if (user._id !== student[0].user_id) {
      const message =
        "Authorization Error: Only the user who created the student can update its details";
      return handleError(res, 403, message);
    }

    const { error } = validateStudent(student);
    if (error)
      return handleError(res, 400, `joi error: ${error.details[0].message}`);

    const normalizedEditedStudent = await normalizeStudents(student);

    const newStudent = await Student.findOneAndUpdate(
      { "MyArray.id": student[0].id },
      { $set: { MyArray: normalizedEditedStudent.MyArray } },
      { new: true }
    );

    if (!newStudent) {
      return handleError(res, 404, "Object not found.");
    }

    Promise.resolve(newStudent);
    return res.send(newStudent);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const EditStudentDetails = async (req, res) => {
  try {
    const student = req.body;
    const { studentId } = req.params;
    const user = req.user;
    if (user._id !== student[0].user_id) {
      const message =
        "Authorization Error: Only the user who created the student can update its details";
      return handleError(res, 403, message);
    }

    const { error } = validateStudent(student);
    if (error)
      return handleError(res, 400, `joi error: ${error.details[0].message}`);

    const normalizedEditedStudent = await normalizeStudents(student);

    const newStudent = await Student.findOneAndUpdate(
      { _id: studentId },
      {
        $set: {
          "MyArray.$[].price": normalizedEditedStudent.MyArray[0].price,
          "MyArray.$[].allowedAbsences":
            normalizedEditedStudent.MyArray[0].allowedAbsences,
          "MyArray.$[].durationOfLesson":
            normalizedEditedStudent.MyArray[0].durationOfLesson,
          "address.city": normalizedEditedStudent.MyArray[0].city,
          "address.street": normalizedEditedStudent.MyArray[0].street,
          "address.houseNumber": normalizedEditedStudent.MyArray[0].houseNumber,
          "address.floor": normalizedEditedStudent.MyArray[0].floor,
          "address.appartment": normalizedEditedStudent.MyArray[0].appartment,
          phone: normalizedEditedStudent.MyArray[0].phone,
          email: normalizedEditedStudent.MyArray[0].email,
        },
      },
      { new: true }
    );

    if (!newStudent) {
      return handleError(res, 404, "Object not found.");
    }

    Promise.resolve(newStudent);
    return res.send(newStudent);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const EditStudentPaymentRequst = async (req, res) => {
  try {
    const student = req.body;
    const { studentId } = req.params;
    const user = req.user;
    if (user._id !== student[0].user_id) {
      const message =
        "Authorization Error: Only the user who created the student can update its details";
      return handleError(res, 403, message);
    }

    const { error } = validateStudent(student);
    if (error)
      return handleError(res, 400, `joi error: ${error.details[0].message}`);

    const normalizedEditedStudent = await normalizeStudents(student);

    const newStudent = await Student.findOneAndUpdate(
      { _id: normalizedEditedStudent.MyArray[0]._id },
      {
        $set: {
          sumOfPaymentRequest: normalizedEditedStudent.sumOfPaymentRequest,

          dateOfPaymentRequest: normalizedEditedStudent.dateOfPaymentRequest,

          paymentSendAndNotReceived:
            normalizedEditedStudent.paymentSendAndNotReceived,

          studentVerifiedEmail: normalizedEditedStudent.studentVerifiedEmail,
        },
      },
      { new: true }
    );

    if (!newStudent) {
      return handleError(res, 404, "Object not found.");
    }

    Promise.resolve(newStudent);
    return res.send(newStudent);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const DeleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const user = req.user;
    const studentFromClient = await Student.findById(studentId);

    if (!studentFromClient)
      throw new Error(
        "could not delete this student because a student with that id cannot be found in the database"
      );

    if (!user.isAdmin && user._id != studentFromClient.user_id)
      throw new Error(
        "only admin user or the teacher of this student can delete him"
      );

    const student = await Student.findByIdAndDelete(studentId);

    const studentForArchieve = lodash.pick(
      student,
      "MyArray",
      "phone",
      "email",
      "user_id"
    );

    const archivedCollection = new DeletedStudents(studentForArchieve);
    const archivedFromDB = await archivedCollection.save();

    Promise.resolve(archivedFromDB);
    return res.send(archivedFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { studentsEmail } = req.params;
    const verifyEmailCommand = new VerifyEmailAddressCommand({
      EmailAddress: studentsEmail,
    });

    const response = await ses.send(verifyEmailCommand);
    return res.send(response);
  } catch (error) {
    return handleError(res, 404, `Error verifying email: ${error.message}`);
  }
};

const sendEmail = async (req, res) => {
  try {
    const student = req.body;
    console.log(student);
    const user = req.user;
    if (user._id != student.user_id) {
      const message =
        "Authorization Error: Only the user who created the student can send payment request email";
      return handleError(res, 403, message);
    }
    const params = {
      Destination: {
        ToAddresses: [student.email],
      },
      Message: {
        Body: {
          Text: {
            Data: `Dear parents of ${student.MyArray[0].title.replace(
              /✅|❌|❗/g,
              ""
            )}, payment of ${
              student.sumOfPaymentRequest
            } has been requested by Your private teacher.
             Sended by EasyTeach system`,
          },
        },
        Subject: { Data: "Payment Request" },
      },
      Source: "raz6301@gmail.com",
    };
    const command = new SendEmailCommand(params);
    const response = await ses.send(command);
    return res.send(response);
  } catch (error) {
    return handleError(res, 404, `Error in sending email: ${error.message}`);
  }
};

const getEmaillist = async (req, res) => {
  try {
    const { email } = req.params;
    const user = req.user;
    console.log(email);
    if (!user) throw new Error("only registered user can do like to cards");
    const command = new ListVerifiedEmailAddressesCommand({});
    const response = await ses.send(command);

    if (response && response.VerifiedEmailAddresses) {
      const isVerified = response.VerifiedEmailAddresses.includes(email);
      console.log(response);
      return res.send(isVerified);
    }
  } catch (error) {
    return handleError(
      res,
      404,
      `Error checking email verification: ${error.message}`
    );
  }
};

const getDeletedStudents = async (req, res) => {
  try {
    const user = req.user;
    const students = await DeletedStudents.find({ user_id: user._id });
    Promise.resolve(students);
    return res.send(students);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.getStudent = getStudent;
exports.getMyStudents = getMyStudents;
exports.createStudent = createStudent;
exports.EditStudent = EditStudent;
exports.DeleteStudent = DeleteStudent;
exports.EditStudentDetails = EditStudentDetails;
exports.EditStudentPaymentRequst = EditStudentPaymentRequst;
exports.verifyEmail = verifyEmail;
exports.sendEmail = sendEmail;
exports.getEmaillist = getEmaillist;
exports.getDeletedStudents = getDeletedStudents;
exports.EditStudentDay = EditStudentDay;
