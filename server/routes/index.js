// Главнй файл для роутинга
const Router = require("express");
const router = new Router();

const cartRouter = require('./cartRoter')
const productRouter = require("./productRouter");

router.use("/products", productRouter);
router.use("/cart", cartRouter);

module.exports = router;
