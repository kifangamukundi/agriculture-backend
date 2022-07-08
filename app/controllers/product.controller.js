const db = require("../models");
const { product: Product } = db;

const allProducts = async (req, res, next) => {
    try {
      const products = await Product.find().populate("categories");
      if (products.length === 0) {
        return res.status(404).json({
           'message': 'No Products found.' 
        });
      }
      res.status(200).json({
        message: "Product Fetched successfully",
        products: products
      });
    } catch (err) {
        res.status(500).json({
          message: "Product fetch failed",
          error: err
        });
    }
};

const createProduct = async (req, res, next) => {
  if (!req?.body?.title || !req?.body?.description || !req?.body?.productImage) {
    return res.status(400).json({ 
      'message': 'Title, description and productImage are required'
    });
  }

  try {
      const result = await Product.create({
          title: req.body.title,
          description: req.body.description,
          productImage: req.body.productImage,
          categories: req.body.categories,
      });
  res.status(201).json({
    message: "Product created",
    createdProduct: result
  });
  } catch (err) {
      res.status(500).json({
        message: "Product creation failed",
        error: err
      });
      console.log(err);
  }
};

const getProduct = async (req, res, next) => {
  if (!req?.params?.productId) return res.status(400).json({ 'message': 'Product ID required.' });
  try {
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.params.id}.` });
    }
    res.status(200).json({
      message: "Product fetched",
      fetchedProduct: product
    });
  } catch (err) {
    res.status(500).json({
      message: "Product deletion failed",
      error: err
    });
  }
};

const updateProduct = async (req, res, next) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'ID parameter is required.' });
  }

  try {
    const product = await Product.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });
    }
    if (req.body?.title) product.title = req.body.title;
    if (req.body?.description) product.description = req.body.description;
    const result = await product.save();
    res.status(200).json({
      message: "Product updated",
      updateProduct: result
    });
  } catch (err) {
      res.status(500).json({
        message: "Product update failed",
        error: err
      });
  }
};

const deleteProduct = async (req, res, next) => {
  if (!req?.params?.productId) return res.status(400).json({ 'message': 'Product ID required.' });
  try {
    const product = await Product.findOne({ _id: req.params.productId }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });
    }
    const result = await product.deleteOne(); //{ _id: req.body.id }
    res.status(200).json({
      message: "Product deleted",
      deleteProduct: result
    });
  } catch (err) {
      res.status(500).json({
        message: "Product deletion failed",
        error: err
      });
  }
};

module.exports = {
  allProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}