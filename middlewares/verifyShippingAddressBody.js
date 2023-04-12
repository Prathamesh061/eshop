const ShippingAddressModel = require("../models/address.model");
const {
  isValidZipcode,
  isValidPhoneNumber,
} = require("../validators/validators");

const validateShippingAddressBody = async (req, res, next) => {
  if (!req.body.zipcode) {
    res.status(400).send({
      message: "Failed! Zipcode is not provided!",
    });
    return;
  }

  if (!isValidZipcode(req.body.zipcode)) {
    res.status(400).send({
      message: "Invalid zip code!",
    });
    return;
  }

  if (!req.body.state) {
    res.status(400).send({
      message: "Failed! State is not provided !",
    });
    return;
  }

  if (!req.body.street) {
    res.status(400).send({
      message: "Failed! Street is not provided !",
    });
    return;
  }

  if (!req.body.city) {
    res.status(400).send({
      message: "Failed! City is not provided !",
    });
    return;
  }

  if (!isValidPhoneNumber(req.body.contactNumber)) {
    res.status(400).send({
      message: "Invalid contact number!",
    });
    return;
  }

  if (!req.body.name) {
    res.status(400).send({
      message: "Failed! Name is not provided !",
    });
    return;
  }

  next();
};

module.exports = {
  validateShippingAddressBody,
};
