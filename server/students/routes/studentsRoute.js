const express = require("express");
const {
  createStudent,
  getMyStudents,
  EditStudent,
  DeleteStudent,
  EditStudentDetails,
  getStudent,
  EditStudentPaymentRequst,
  verifyEmail,
  sendEmail,
  getEmaillist,
  getDeletedStudents,
  EditStudentDay,
} = require("../controllers/studentsController");
const auth = require("../../auth/authService");
const router = express.Router();

router.get("/my-students", auth, getMyStudents);
router.get("/deleted-students", auth, getDeletedStudents);
router.get("/verify-email/:studentsEmail", auth, verifyEmail);
router.put("/send-email", auth, sendEmail);
router.get("/:studentId", auth, getStudent);
router.post("/", auth, createStudent);
router.patch("/:studentId", auth, EditStudent);
router.put("/:studentId", auth, EditStudentDetails);
router.put("/payment-requst/:studentId", auth, EditStudentPaymentRequst);
router.delete("/:studentId", auth, DeleteStudent);
router.get("/emails-list/:email", auth, getEmaillist);
router.post("/edit-new-day", auth, EditStudentDay);

module.exports = router;
