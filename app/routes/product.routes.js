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
  
  


app.get("/api/product/all", controller.products_get_all);

app.post("/api/product", [authJwt.verifyToken], upload.single('productImage'), controller.products_create_product); // upload.single('productImage')

app.get("/api/product/:productId", controller.products_get_product);

app.patch("/api/product/:productId", [authJwt.verifyToken], controller.products_update_product);

app.delete("/api/product/:productId", [authJwt.verifyToken], controller.products_delete);
};