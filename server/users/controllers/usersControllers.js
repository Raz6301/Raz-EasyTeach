const { generateAuthToken } = require("../../auth/providers/jwt");
const { handleError } = require("../../utils/errorHandler");
const { comparePassword } = require("../helpers/bycript");
const normalizeEditUser = require("../helpers/normalizeEditUser");
const normalizeUser = require("../helpers/normalizeUser");
const userUpdateValidation = require("../models/joi/editUserValidation");
const { loginValidation } = require("../models/joi/loginValidation");
const validateUser = require("../models/joi/validateUser");
const User = require("../models/mongoose/User");

const register = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    const { error } = validateUser(user);
    if (error)
      return handleError(res, 400, `Joi error: ${error.details[0].message}`);

    const isUserExist = await User.findOne({ email });
    if (isUserExist) throw new Error("user is already exist");

    const normalizedUser = normalizeUser(user);

    const userToDB = new User(normalizedUser);
    const userFromDB = await userToDB.save();
    res.send(userFromDB);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    const { error } = loginValidation(user);

    if (error)
      return handleError(res, 400, `Joi error: ${error.details[0].message}`);

    const userInDB = await User.findOne({ email });
    if (!userInDB)
      throw new Error("Authentication error: email or password incorrect");

    const isPasswordValid = comparePassword(user.password, userInDB.password);
    if (!isPasswordValid)
      throw new Error("Authentication error: email or password incorrect");

    const { _id, isBusiness, isAdmin } = userInDB;
    const token = generateAuthToken({ _id, isBusiness, isAdmin });
    num = 0;
    res.send(token);
  } catch (error) {
    const isAuthError =
      error.message === "Authentication error: email or password incorrect";

    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose error ${error.message}`
    );
  }
};

const getUsers = async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );
    const users = await User.find({}, { password: 0, __v: 0 });
    Promise.resolve(users);
    return res.send(users);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req.user;
    if (userId != user._id && !user.isAdmin) {
      const message =
        "Authorization Error: You must be an admin type user or the registered user to see this user details";
      return handleError(res, 403, message);
    }

    const userDetail = await User.findById(userId, { password: 0, __v: 0 });
    if (!userDetail) throw new Error("cannot find this user in database");
    Promise.resolve(userDetail);
    return res.send(userDetail);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req.user;
    const editedUser = req.body;

    if (user._id != userId)
      throw new Error("only the registered user can edit his details");

    const { error } = userUpdateValidation(editedUser);
    if (error)
      return handleError(res, 400, `Joi error: ${error.details[0].message}`);

    const normalizedEditedUser = normalizeEditUser(editedUser);
    const newUser = await User.findByIdAndUpdate(userId, normalizedEditedUser, {
      new: true,
    });

    Promise.resolve(newUser);
    return res.send(newUser);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

const changeBizStatus = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;

    if (!user.isAdmin)
      throw new Error("only admin can change business status of users ");

    const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
    const newStatusUser = await User.findByIdAndUpdate(userId, pipeline, {
      new: true,
    }).select(["-password", "-__v"]);

    if (!newStatusUser)
      throw new Error(
        "Could not update this user isBusiness status because a user with this ID cannot be found in the database"
      );
    Promise.resolve(newStatusUser);
    res.send(newStatusUser);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    if (user._id !== userId && !user.isAdmin)
      throw new Error("only registered user or admin can delete an account");

    const userToDelete = await User.findByIdAndDelete(userId, {
      password: 0,
      __v: 0,
    });

    if (!userToDelete)
      throw new Error(
        "Could not delete this user because a user with this ID cannot be found in the database"
      );
    Promise.resolve(userToDelete);
    res.send(userToDelete);
  } catch (error) {
    handleError(res, 500, `Mongoose errorL ${error.message}`);
  }
};

exports.register = register;
exports.login = login;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.editUser = editUser;
exports.changeBizStatus = changeBizStatus;
exports.deleteUser = deleteUser;
