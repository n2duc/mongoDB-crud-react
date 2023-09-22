const productController = require("../controllers/productController");

const router = require("express").Router();

// ADD PRODUCT
router.post("/product/new", productController.addProduct);
// GET PRODUCTS
router.get("/products", productController.getAllProduct);
// GET A PRODUCT
router.get("/product/v1/:id", productController.getAProduct);
// DELETE PRODUCT
router.delete("/product/delete/:id", productController.deleteProduct);
// UPDATE PRODUCT
router.put("/product/update/:id", productController.updateProduct);

module.exports = router;