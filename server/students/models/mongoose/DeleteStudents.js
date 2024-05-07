const mongoose = require("mongoose");

const deletedStudentsSchema = new mongoose.Schema({
  MyArray: Object,
  phone: String,
  email: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const DeletedStudents = mongoose.model(
  "item",
  deletedStudentsSchema,
  "archiveStudents"
);

module.exports = DeletedStudents;
