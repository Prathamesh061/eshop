const ProductModel = require("../models/product.model");
const validator = require("validator");

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

exports.updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.productId });

    if (!product) {
      return res.status(404).send({
        message: `No Product found for ID - ${req.params.productId}`,
      });
    }

    product.name = req.body.name ?? product.name;
    product.availableItems = req.body.availableItems ?? product.availableItems;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category ?? product.category;
    product.description = req.body.description ?? product.description;
    product.imageUrl = req.body.imageUrl ?? product.imageUrl;
    product.manufacturer = req.body.manufacturer ?? product.manufacturer;

    const updatedProduct = await product.save({ new: true });

    res.status(200).send(updatedProduct);
  } catch (err) {
    console.log("Some error while updating the product in db", err.message);
    res.status(500).send({
      message: "Some internal error while updating the product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete({
      _id: req.params.productId,
    });

    if (!deletedProduct) {
      return res.status(404).send({
        message: `No Product found for ID - ${req.params.productId}`,
      });
    }

    res.status(200).send({
      message: `Product with ID - ${req.params.productId} deleted successfully!`,
    });
  } catch (err) {
    console.log("Some error while deleting the product in db", err.message);
    res.status(500).send({
      message: "Some internal error while deleting the product",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.productId)) {
      return res.status(400).send({
        message: "Failed! Invalid productId!",
      });
    }

    const product = await ProductModel.findById({ _id: req.params.productId });

    if (!product) {
      return res.status(404).send({
        message: `No Product found for ID - ${req.params.productId}!`,
      });
    }

    res.status(200).send(product);
  } catch (err) {
    console.log("Some error while fetching the product in db", err.message);
    res.status(500).send({
      message: "Some internal error while fetching the product",
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await ProductModel.distinct("category").exec();

    res.status(200).send(categories);
  } catch (err) {
    console.log(
      "Some error while fetching the category of products in db",
      err.message
    );
    res.status(500).send({
      message: "Some internal error while fetching the category of products",
    });
  }
};
