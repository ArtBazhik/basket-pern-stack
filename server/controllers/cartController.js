const { Basket } = require("../models/models");

class CartController {
  // Добавление товара в корзину
  async addToCart(req, res) {
    const { productId, price, qty, discount } = req.body;
    let createProductCart;
    await Basket.create({
      product_id: productId,
      total_price: price,
      qty: qty,
      discount: discount,
    }).then((res) => (createProductCart = res));

    return res.json(createProductCart);
  }

  // Удаление товара из корзины
  async deleteCartProduct(req, res) {
    const { idCartProduct } = req.query;
    await Basket.update(
      {
        is_delete: true,
      },
      { where: { id: idCartProduct } }
    );
    return res.json({ message: "Товар удален из карзины" });
  }

  // Получение всех товаров из корзины (с флагом is_delete равное false)
  async getAll(req, res) {
    let cartProduct;
    cartProduct = await Basket.findAll({
      where: {
        is_delete: false,
      },
    });
    return res.json(cartProduct);
  }

  // Апдейт кол-ва и стоимости товаров при изменении кол-во на стороне UI (клиента)
  async costCalculation(req, res) {
    const { qty, price, idCartProduct } = req.query;

    let totalPrice = qty * price;
    let resData;
    await Basket.update(
      {
        qty: qty,
        total_price: totalPrice,
      },
      { where: { id: idCartProduct } }
    );

    // Расчет скидочного товара (каждый 3)
    if (qty % 3 === 0) {
      // Возврат на frontend товар к которому применилась скидка
      await Basket.findOne({ where: { id: idCartProduct } }).then(
        (res) => (resData = res)
      );
    }
    return res.json(resData);
  }
}

module.exports = new CartController();
