const Product = require("../models/productModel");

//Create Product -- Admin
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

// Get Product Details
exports.getProductDetails = async(req, res, next) => {
  const product = await Product.findById(req.params.id);
   if (!product) {
     return res.status(500).json({
       success: false,
       message: "제품 없어요!!~~",
     });
   }

    res.status(200).json({
      success: true,
     product
    });

}



//Update Product -- Admin
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "제품 없어요!!~~",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

// Delete Product

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "제품 없어요!!~~",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "제품 삭제 성공~~!",
  });
};
