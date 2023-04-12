const ShippingAddressModel = require("../models/address.model");

exports.addShippingAddress = async (req, res) => {
  const addressObj = {
    name: req.body.name,
    contactNumber: req.body.contactNumber,
    street: req.body.street,
    landmark: req.body.landmark,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    eshopUser: req.id,
  };

  try {
    const shippingAddressAdded = await ShippingAddressModel.create(addressObj);

    const postResponse = await ShippingAddressModel.findById(
      shippingAddressAdded.id
    )
      .populate("eshopUser")
      .exec();

    res.status(200).send(postResponse);
  } catch (err) {
    console.log(
      "Some error while adding the Shipping Address in db",
      err.message
    );
    res.status(500).send({
      message: "Some internal error while inserting the Shipping Address",
    });
  }
};
