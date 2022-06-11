const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");
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
  
  


app.get("/api/product/all", controller.allProducts);

app.post("/api/product", [authJwt.verifyToken, authJwt.isModerator], upload.single('productImage'), controller.createProduct); // upload.single('productImage')

app.get("/api/product/:productId", controller.getProduct);

app.patch("/api/product/:productId", [authJwt.verifyToken, authJwt.isModerator], controller.updateProduct);

app.delete("/api/product/:productId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteProduct);
};