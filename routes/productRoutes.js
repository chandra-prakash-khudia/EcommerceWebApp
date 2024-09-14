import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productFiltersController,productCountController,productListController,searchProductController,
    relatedProductController,productCategoryController ,braintreeTokenController ,brainTreePaymentController
} from "../controllers/productController.js";
import formidable from "express-formidable";

import {isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

const router = express.Router()
// router.post("/create-product" , formidable(),createProductController)
// router.put(
//     "/update-product/:pid",
//     formidable(),
//     updateProductController
// )
// //get products
// router.get("/get-product", getProductController);

// //single product
// router.get("/get-product/:slug", getSingleProductController);
// //get photo
// router.get("/product-photo/:pid", productPhotoController);
// router.delete("/delete-product/:pid", deleteProductController);
// router.post("/product-filters", productFiltersController);

// //product count
// router.get("/product-count", productCountController);

// //product per page
// router.get("/product-list/:page", productListController);

// //search product
// router.get("/search/:keyword", searchProductController);

// //similar product
// router.get("/related-product/:pid/:cid", relatedProductController);

// //category wise product
// router.get("/product-category/:slug", productCategoryController);
// //payments routes
// //token
// router.get("/braintree/token", braintreeTokenController);

// //payments
// router.post("/braintree/payment",  brainTreePaymentController);



























//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);



export default router;