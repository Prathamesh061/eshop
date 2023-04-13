const Product = require("../models/product.model");
const validator = require("validator");

const validateProductReqBody = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Failed! Name is not provided!",
    });
    return;
  }

  if (req.body.availableItems === undefined) {
    res.status(400).send({
      message: "Failed! AvailableItems is not provided",
    });
    return;
  }

  if (isNaN(req.body.availableItems)) {
    res.status(400).send({
      message: "Failed! AvailableItems is invalid",
    });
    return;
  }

  if (req.body.price === undefined) {
    res.status(400).send({
      message: "Failed! Price is not provided !",
    });
    return;
  }

  if (isNaN(req.body.price)) {
    res.status(400).send({
      message: "Failed! Price is invalid",
    });
    return;
  }

  if (!req.body.category) {
    res.status(400).send({
      message: "Failed! Category is not provided !",
    });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({
      message: "Failed! Description is not provided !",
    });
    return;
  }

  if (!req.body.imageUrl) {
    res.status(400).send({
      message: "Failed! ImageUrl is not provided",
    });
    return;
  }

  if (!validator.isURL(req.body.imageUrl)) {
    res.status(400).send({
      message: "Failed! ImageUrl is invalid",
    });
    return;
  }

  if (!req.body.manufacturer) {
    res.status(400).send({
      message: "Failed! Manufacturer is not provided !",
    });
    return;
  }

  next();
};

module.exports = {
  validateProductReqBody,
};
