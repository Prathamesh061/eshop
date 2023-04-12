const mongoose = require("mongoose");

const shippingAddressSchema = new mongoose.Schema({
  city: String,
  landmark: String,
  name: String,
  phone: String,
  state: String,
  street: String,
  zipcode: String,
  user_id: String,
});

const ShippingAddressModel = mongoose.model(
  "Eshop_shipping_address",
  shippingAddressSchema
);

module.exports = ShippingAddressModel;
