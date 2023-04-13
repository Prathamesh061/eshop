const productController = require("../controllers/product.controller");
const { verifyProductReqBody, authjwt } = require("../middlewares");
module.exports = (app) => {
  app.post(
    "/eshop/api/v1/products",
    [
      verifyProductReqBody.validateProductReqBody,
      authjwt.verifyToken,
      authjwt.isAdmin,
    ],
    productController.saveProduct
  );
};
