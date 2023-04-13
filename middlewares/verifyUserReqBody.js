const UserModel = require("../models/user.model");
const {
  isValidEmail,
  isValidPhoneNumber,
} = require("../validators/validators");

validateUserRequestBody = async (req, res, next) => {
  if (!req.body.userId) {
    res.status(400).send({
      message: "Failed! UserId is not provided !",
    });
    return;
  }
  //Validating the userId
  const user = await UserModel.findOne({ userId: req.body.userId });
  if (user != null) {
    res.status(400).send({
      message: "Failed! Userid  already exists!",
    });
    return;
  }

  if (!req.body.firstName) {
    res.status(400).send({
      message: "Failed! FirstName is not provided !",
    });
    return;
  }
  if (!req.body.lastName) {
    res.status(400).send({
      message: "Failed! LastName is not provided !",
    });
    return;
  }

  //Validating the email Id
  if (!req.body.email) {
    res.status(400).send({
      message: "Failed! Email is not provided !",
    });
    return;
  }

  if (!isValidEmail(req.body.email)) {
    res.status(400).send({
      message: "Invalid email-id format!",
    });
    return;
  }

  const email = await UserModel.findOne({ email: req.body.email });
  if (email != null) {
    res.status(400).send({
      message: "Try any other email, this email is already registered!",
    });
    return;
  }

  if (!isValidPhoneNumber(req.body.contactNumber)) {
    res.status(400).send({
      message: "Invalid contact number!",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "Failed! Password is not provided !",
    });
    return;
  }
  next();
};

const validateUserSigninBody = function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    // If either email or password is missing, send a 400 Bad Request response
    return res.status(400).send({
      message: "Email and password are required",
    });
  }

  if (!isValidEmail(req.body.email)) {
    return res.status(400).send({
      message: "Invalid email-id format!",
    });
  }

  next();
};

module.exports = {
  validateUserRequestBody,
  validateUserSigninBody,
};
