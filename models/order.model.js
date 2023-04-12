const mongoose = require("mongoose");

const eshopOrderSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  order_date: {
    type: Date,
    required: true,
  },
  product_product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "eshop_product",
    required: true,
  },
  shipping_address_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "eshop_shipping_address",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "eshop_user",
    required: true, 
  },
});

const EshopOrderModel = mongoose.model("Eshop_order", eshopOrderSchema);

module.exports = EshopOrderModel;
