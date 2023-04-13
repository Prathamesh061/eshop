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
  app.put(
    "/eshop/api/v1/products/:productId",
    [
      verifyProductReqBody.validateProductUpdateBody,
      authjwt.verifyToken,
      authjwt.isAdmin,
    ],
    productController.updateProduct
  );

  app.delete(
    "/eshop/api/v1/products/:productId",
    [authjwt.verifyToken, authjwt.isAdmin],
    productController.deleteProduct
  );

  app.get("/eshop/api/v1/products");
  
  app.get("/eshop/api/v1/products/categories", productController.getCategories);

  app.get(
    "/eshop/api/v1/products/:productId",
    productController.getProductById
  );
};
