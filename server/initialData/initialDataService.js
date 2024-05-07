const normalizeStudents = require("../students/helpers/normalizeStudents");
const validateStudent = require("../students/models/joi/validateStudent");
const Student = require("../students/models/mongoose/Student");
const normalizeUser = require("../users/helpers/normalizeUser");
const validateUser = require("../users/models/joi/validateUser");
const User = require("../users/models/mongoose/User");
const data = require("./initialData.json");
const chalk = require("chalk");

const generateInitialCards = async () => {
  const { students } = data;
  const userId = "64b3b2a4c8828501a8029ad5";
  students.forEach(async (student) => {
    try {
      const { error } = validateStudent(student);
      if (error) throw new Error(`joi error: ${error.details[0].message}`);

      const normalizedStudent = await normalizeStudents(student, userId);
      const studentToDB = new Student(normalizedStudent);
      await studentToDB.save();
      console.log(
        chalk.greenBright(`generate student ${student[0].title} succussfully`)
      );
    } catch (error) {
      console.log(chalk.redBright(`initial data error:${error.message}`));
    }
  });
};

const generateInitialUsers = async () => {
  const { users } = data;

  users.forEach(async (user) => {
    try {
      const { email } = user;
      const { error } = validateUser(user);
      if (error)
        return handleError(res, 400, `Joi error: ${error.details[0].message}`);

      const isUserExist = await User.findOne({ email });
      if (isUserExist) throw new Error("user is already exist");

      const normalizedUser = normalizeUser(user);

      const userToDB = new User(normalizedUser);
      await userToDB.save();
      console.log(
        chalk.greenBright(`generate card ${user.name.first} succussfully`)
      );
    } catch (error) {
      console.log(chalk.redBright(`initial data error:${error.message}`));
    }
  });
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;
