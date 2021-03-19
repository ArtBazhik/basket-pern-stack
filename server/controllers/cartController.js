const { Basket } = require("../models/models");

class CartController {
  // Добавление товара в корзину
  async addToCart(req, res) {
    const { productId, price, qty, discount } = req.body;
    await Basket.create({
      product_id: productId,
      total_price: price,
      qty: qty,
      discount: discount,
    });
    return res.json(req.body);
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

    await Basket.update(
      {
        qty: qty,
        total_price: totalPrice,
      },
      { where: { id: idCartProduct } }
    );

    return res.json({ total: totalPrice });
  }
}

module.exports = new CartController();
