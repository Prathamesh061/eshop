const ProductModel = require("../models/product.model");
const AddressModel = require("../models/address.model");
const OrderModel = require("../models/order.model");

const placeOrder = async (req, res) => {
  try {
    const { productId, addressId, quantity } = req.body;

    const product = await ProductModel.findOne({ _id: productId });

    if (!product) {
      return res
        .status(404)
        .json({ message: `No Product found for ID - ${productId}!` });
    }

    if (product.availableItems < quantity) {
      return res.status(400).json({
        message: `Product with ID - ${productId} is currently out of stock!`,
      });
    }

    const address = await AddressModel.findOne({ _id: addressId });
    if (!address) {
      return res
        .status(404)
        .json({ message: `No Address found for ID - ${addressId}!` });
    }

    const orderObj = {
      userId: req.id,
      productId: productId,
      shippingAddressId: addressId,
      amount: quantity * product.price,
      quantity: quantity,
    };

    const placedOrder = await OrderModel.create(orderObj);

    // Update product stock
    product.availableItems -= quantity;
    await product.save();

    const responseObj = await OrderModel.findById({
      _id: placedOrder.id,
    })
      .populate(["productId", "shippingAddressId", "userId"])
      .exec();

    return res.status(200).send(responseObj);
  } catch (err) {
    console.log("Some error while placing the order", err.message);
    res.status(500).send({
      message: "Some internal error while placing the order",
    });
  }
};

module.exports = {
  placeOrder,
};
