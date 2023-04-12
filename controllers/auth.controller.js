const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");

exports.signup = async (req, res) => {
  const userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    contactNumber: req.body.contactNumber,
  };

  try {
    const userCreated = await User.create(userObj);

    const postResponse = {
      _id: userCreated.id,
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      email: userCreated.email,
    };

    res.status(200).send(postResponse);
  } catch (err) {
    console.log("Some error while saving the user in db", err.message);
    res.status(500).send({
      message: "Some internal error while inserting the element",
    });
  }
};

exports.signin = async (req, res) => {
  //Fetch the user based on the userId
  //Validating the userId
  const user = await User.findOne({ email: req.body.email });

  if (user == null) {
    res.status(400).send({
      message: "This email has not been registered!",
    });
    return;
  }

  //Checkig if the password matches
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Credentials!",
    });
  }
  const token = jwt.sign(
    {
      username: user.firstName + " " + user.lastName,
      role: user.role,
      createdAt: user.createdAt,
    },
    authConfig.secret,
    {
      expiresIn: 86400, // 24 hours
    }
  );

  res.status(200).send({
    email: user.email,
    name: user.firstName + " " + user.lastName,
    isAuthenticated: true,
    "x-auth-token": token,
  });
};
