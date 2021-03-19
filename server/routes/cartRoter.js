// Роуты для корзины
const Router = require("express");
const router = new Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getAll);
router.post("/", cartController.addToCart);
router.put("/", cartController.costCalculation);
router.delete("/", cartController.deleteCartProduct);

module.exports = router;
