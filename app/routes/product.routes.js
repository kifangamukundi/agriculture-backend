const { authJwt } = require("../middlewares");
const productsController = require("../controllers/product.controller");
const multer = require('multer');

module.exports = function(app) {

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  
  


app.get("/api/products", productsController.allProducts);

app.post("/api/products", [authJwt.verifyToken, authJwt.isModerator], upload.single('productImage'), productsController.createProduct); // upload.single('productImage')

app.get("/api/products/:productId", productsController.getProduct);

app.patch("/api/products/:productId", [authJwt.verifyToken, authJwt.isModerator], productsController.updateProduct);

app.delete("/api/products/:productId", [authJwt.verifyToken, authJwt.isModerator], productsController.deleteProduct);
};