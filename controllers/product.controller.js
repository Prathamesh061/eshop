const ProductModel = require("../models/product.model");

exports.saveProduct = async (req, res) => {
  const productObj = {
    name: req.body.name,
    availableItems: req.body.availableItems,
    price: parseFloat(req.body.price).toFixed(1),
    category: req.body.category,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    manufacturer: req.body.manufacturer,
  };

  try {
    const productAdded = await ProductModel.create(productObj);

    res.status(200).send(productAdded);
  } catch (err) {
    console.log("Some error while adding the product in db", err.message);
    res.status(500).send({
      message: "Some internal error while inserting the product",
    });
  }
};
